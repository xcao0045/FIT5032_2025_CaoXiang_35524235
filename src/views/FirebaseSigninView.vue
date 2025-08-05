<template>
  <div class="container">
    <div class="form-wrapper">
      <h1>Sign in</h1>
      
      <div class="login-mode-selection">
        <h3>Select Login Mode</h3>
        <div class="mode-buttons">
          <button 
            type="button" 
            :class="['mode-btn', { active: loginMode === 'user' }]"
            @click="setLoginMode('user')"
          >
            User Mode
          </button>
          <button 
            type="button" 
            :class="['mode-btn', { active: loginMode === 'admin' }]"
            @click="setLoginMode('admin')"
          >
            Admin Mode
          </button>
        </div>
      </div>

      <div class="login-form">
        <!-- <p v-if="loginMode === 'admin'" class="admin-notice">
          Admin login: Use admin@gmail.com
        </p> -->
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p><button @click="signin">Sign in as {{ loginMode === 'admin' ? 'Admin' : 'User' }}</button></p>
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const loginMode = ref("user");
const error = ref("");
const router = useRouter();
const auth = getAuth();

const setLoginMode = (mode) => {
  loginMode.value = mode;
  error.value = "";
};

const signin = () => {
  if (loginMode.value === 'admin' && email.value !== 'admin@gmail.com') {
    error.value = 'Admin mode requires admin@gmail.com email address.';
    return;
  }
  
  if (loginMode.value === 'user' && email.value === 'admin@gmail.com') {
    error.value = 'admin@gmail.com can only login in Admin mode.';
    return;
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Login Successful!");
      console.log(auth.currentUser);
      
      const userRole = loginMode.value;
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userEmail', email.value);
      
      if (loginMode.value === 'admin') {
        console.log("Logged in as Admin");
        router.push("/");
      } else {
        console.log("Logged in as User");
        router.push("/");
      }
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          error.value = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          error.value = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          error.value = 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          error.value = 'This account has been disabled.';
          break;
        default:
          error.value = 'Login failed. Please try again.';
      }
    });
};
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.form-wrapper {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 450px;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
}

.login-mode-selection {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.login-mode-selection h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 500;
}

.mode-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.mode-btn {
  padding: 10px 20px;
  border: 2px solid #275fda;
  background: white;
  color: #275fda;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 120px;
}

.mode-btn:hover {
  background-color: #f0f4ff;
}

.mode-btn.active {
  background: #275fda;
  color: white;
}

.login-form {
  margin-top: 20px;
}

.admin-notice {
  background-color: #fff3cd;
  color: #856404;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #ffeaa7;
}

p {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #275fda;
  box-shadow: 0 0 0 3px rgba(39, 95, 218, 0.1);
}

button {
  background: linear-gradient(135deg, #275fda, #4285f4);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

button:hover {
  background: linear-gradient(135deg, #1e4bb8, #3367d6);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(39, 95, 218, 0.3);
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 5px;
  margin-top: 15px;
  font-size: 14px;
}
</style>