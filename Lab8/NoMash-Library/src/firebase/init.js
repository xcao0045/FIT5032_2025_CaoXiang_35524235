// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH2Z3-bMrsSWAXXxzVNi0tvRsGKESlkS4",
  authDomain: "fit5032-lab6.firebaseapp.com",
  projectId: "fit5032-lab6",
  storageBucket: "fit5032-lab6.firebasestorage.app",
  messagingSenderId: "757696268806",
  appId: "1:757696268806:web:82c5bfbdeaf46692b0d187"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized services
export { auth, db };
export default app;