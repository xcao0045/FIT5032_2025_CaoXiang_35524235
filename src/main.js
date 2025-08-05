import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

// Initialize Firebase
import './firebase/init.js'

// Initialize Firebase auth monitoring after Firebase is initialized
import { initializeFirebaseAuth } from './auth';
initializeFirebaseAuth();

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

app.mount('#app')