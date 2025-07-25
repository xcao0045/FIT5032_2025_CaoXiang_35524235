<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>

        <li v-if="isAuthenticated" class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <li v-if="!isAuthenticated && !firebaseUser" class="nav-item">
            <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>

        <li v-if="!isAuthenticated && !firebaseUser" class="nav-item">
            <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>

        <li v-if="!isAuthenticated && !firebaseUser" class="nav-item">
            <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>

        <li v-if="firebaseUser" class="nav-item">
            <router-link to="/FireLogout" class="nav-link" active-class="active">
              Firebase Logout ({{ userRole === 'admin' ? 'Admin' : 'User' }})
            </router-link>
        </li>

        <li v-if="isAuthenticated" class="nav-item">
            <button @click="handleLogout" class="nav-link">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { isAuthenticated, firebaseUser, userRole } from '../auth';

const router = useRouter();

const handleLogout = () => {
    isAuthenticated.value = false;
    router.push('/login');
};
</script>

<style scoped>
.nav-link.btn-like {
  background: none;
  border: none;
  color: var(--bs-nav-link-color);
  padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
}
.nav-link.btn-like:hover {
    color: var(--bs-nav-link-hover-color);
}
</style>