import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2Ir1d9h57mYqM1xY-8sgqOcGRivqOMVI",
  authDomain: "evaluacion-modulo5-20230644.firebaseapp.com",
  projectId: "evaluacion-modulo5-20230644",
  storageBucket: "evaluacion-modulo5-20230644.firebasestorage.app",
  messagingSenderId: "890318891309",
  appId: "1:890318891309:web:4f21b92e264a54357c0ba4"
};

console.log("Valor de configuracion", firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export { database };