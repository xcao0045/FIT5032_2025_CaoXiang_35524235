import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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
initializeApp(firebaseConfig);

// Initialize Firebase auth monitoring after Firebase is initialized
import { initializeFirebaseAuth } from './auth';
initializeFirebaseAuth();

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')