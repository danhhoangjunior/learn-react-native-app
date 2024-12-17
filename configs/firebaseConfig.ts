// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwfyvoGV1hPyh-fd5bIzThnJ3SybUR038",
    authDomain: "learn-react-native-97fbb.firebaseapp.com",
    databaseURL: "https://learn-react-native-97fbb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learn-react-native-97fbb",
    storageBucket: "learn-react-native-97fbb.appspot.com",
    messagingSenderId: "166486986942",
    appId: "1:166486986942:web:655224328f30273ad44eef",
    measurementId: "G-3XPGJ8YPH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
