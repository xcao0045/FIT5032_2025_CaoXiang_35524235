// src/auth.js
import { ref } from 'vue'

export const isAuthenticated = ref(false)
export const firebaseUser = ref(null)
export const userRole = ref(null)

export const initializeFirebaseAuth = () => {
  import('firebase/auth').then(({ getAuth, onAuthStateChanged }) => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      firebaseUser.value = user
      if (user) {
        const storedRole = localStorage.getItem('userRole')
        const storedEmail = localStorage.getItem('userEmail')
        
        if (storedEmail === user.email && storedRole) {
          userRole.value = storedRole
        } else {
          userRole.value = user.email === 'admin@gmail.com' ? 'admin' : 'user'
          localStorage.setItem('userRole', userRole.value)
          localStorage.setItem('userEmail', user.email)
        }
      } else {
        userRole.value = null
        localStorage.removeItem('userRole')
        localStorage.removeItem('userEmail')
      }
    })
  })
}