import { useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  onSnapshot, 
  updateDoc 
} from 'firebase/firestore';
import { database } from '../config/firebase';

export const useUsers = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  
  const auth = getAuth();

  useEffect(() => {
  let unsubscribeFromUserProfile = null;

  //Función para ctualizar los datos del usuario automáticamente si se actualizan
  const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);

      // Escucha en tiempo real los cambios en el perfil del usuario
      const userRef = doc(database, 'users', user.uid);
      unsubscribeFromUserProfile = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        }
      });
    } else {
      setUser(null);
      setUserProfile(null);
      if (unsubscribeFromUserProfile) {
        unsubscribeFromUserProfile();
      }
    }
    setLoading(false);
  });

  // Cleanup
  return () => {
    unsubscribeFromAuth();
    if (unsubscribeFromUserProfile) {
      unsubscribeFromUserProfile();
    }
  };
}, []);

  //Función para registrar un nuevo usuario
  const register = async (userData) => {
    try {
      const { email, password, name, universityDegree, graduationYear } = userData;
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar información adicional en Firestore
      await setDoc(doc(database, 'users', user.uid), {
        name,
        email,
        universityDegree,
        graduationYear,
        createdAt: new Date().toISOString()
      });

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  //Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  //Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  //Función para obtener la información del perfil del usuario
  const getUserProfile = async (userId) => {
    try {
      const docRef = doc(database, 'users', userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const profileData = docSnap.data();
        setUserProfile(profileData);
        return profileData;
      }
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  };

  //Función para actualizar la información del perfil del usuario
  const updateUserProfile = async (userData) => {
    try {
      if (!user) return { success: false, error: 'No user logged in' };
      
      const userRef = doc(database, 'users', user.uid);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString()
      });

      // Actualizar el estado local
      setUserProfile(prevProfile => ({
        ...prevProfile,
        ...userData
      }));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    userProfile,
    loading,
    register,
    login,
    logout,
    updateUserProfile,
    getUserProfile
  };
};