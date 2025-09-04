import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useAuth } from '../hooks/useAuth';

const EditProfileModal = ({ visible, onClose, currentProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    universityDegree: '',
    graduationYear: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { updateUserProfile } = useAuth();

  useEffect(() => {
    if (currentProfile && visible) {
      setFormData({
        name: currentProfile.name || '',
        universityDegree: currentProfile.universityDegree || '',
        graduationYear: currentProfile.graduationYear || ''
      });
    }
  }, [currentProfile, visible]);

  // ← AGREGAMOS LA FUNCIÓN handleInputChange
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // ← AGREGAMOS LA FUNCIÓN handleSave (la más sospechosa)
  const handleSave = async () => {
    const { name, universityDegree, graduationYear } = formData;
    
    if (!name.trim() || !universityDegree.trim() || !graduationYear.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const currentYear = new Date().getFullYear();
    const year = parseInt(graduationYear);
    if (isNaN(year) || year < 1950 || year > currentYear + 10) {
      Alert.alert('Error', 'Por favor ingresa un año de graduación válido');
      return;
    }

    setLoading(true);
    const result = await updateUserProfile({
      name: name.trim(),
      universityDegree: universityDegree.trim(),
      graduationYear: graduationYear.trim()
    });
    setLoading(false);

    if (result.success) {
      Alert.alert('Éxito', 'Información actualizada correctamente', [
        { 
          text: 'OK', 
          onPress: () => onClose() 
        }
      ]);
    } else {
      Alert.alert('Error', result.error);
    }
  };

  // ← AGREGAMOS LA FUNCIÓN handleCancel
  const handleCancel = () => {
    if (currentProfile) {
      setFormData({
        name: currentProfile.name || '',
        universityDegree: currentProfile.universityDegree || '',
        graduationYear: currentProfile.graduationYear || ''
      });
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCancel} // ← CAMBIO: usamos handleCancel
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleCancel} // ← CAMBIO: usamos handleCancel
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>Editar Perfil</Text>
          
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.buttonDisabled]}
            onPress={handleSave} // ← CAMBIO: usamos handleSave
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Guardar</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingresa tu nombre completo"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)} // ← CAMBIO
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Carrera Universitaria</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: Ingeniería en Sistemas"
                value={formData.universityDegree}
                onChangeText={(value) => handleInputChange('universityDegree', value)} // ← CAMBIO
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Año de Graduación</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: 2024"
                value={formData.graduationYear}
                onChangeText={(value) => handleInputChange('graduationYear', value)} // ← CAMBIO
                keyboardType="numeric"
                editable={!loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    flex: 1,
    textAlign: 'center',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#B91C1C',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonDisabled: { // ← AGREGAMOS
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: { // ← AGREGAMOS
    padding: 20,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
});

export default EditProfileModal;