<template>
  <div class="mx-auto text-center" style="max-width: 400px;">
    <h1>Login Page</h1>
    <form @submit.prevent="handleLogin" class="mt-4">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input type="text" class="form-control" id="username" v-model="username" />
      </div>
      
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" />
      </div>

      <button type="submit" class="btn btn-primary w-100">Login</button>
      <p v-if="error" class="text-danger mt-3">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated } from '../auth';

const username = ref('');
const password = ref('');
const error = ref(null);

const router = useRouter();

const handleLogin = () => {
  if (username.value === 'admin' && password.value === 'password123') {
    isAuthenticated.value = true;
    error.value = null;
    router.push('/about');
  } else {
    isAuthenticated.value = false;
    error.value = 'Invalid username or password.';
  }
};
</script>