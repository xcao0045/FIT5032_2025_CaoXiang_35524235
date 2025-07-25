<template>
  <div class="container">
    <div class="form-wrapper">
      <h1>Firebase Logout</h1>
      <div v-if="user" class="user-info">
        <p>Currently signed in as: <strong>{{ user.email }}</strong></p>
        <p class="role-badge">
          <span :class="['badge', userRole === 'admin' ? 'admin-badge' : 'user-badge']">
            {{ userRole === 'admin' ? 'Administrator' : 'User' }}
          </span>
        </p>
        <p><button @click="logout" class="logout-btn">Sign out from Firebase</button></p>
      </div>
      <div v-else class="not-signed-in">
        <p>You are not currently signed in to Firebase.</p>
        <p><router-link to="/FireLogin" class="btn-link">Go to Firebase Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import { userRole } from "../auth";

const user = ref(null);
const router = useRouter();
const auth = getAuth();

// Monitor authentication state
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("Firebase Logout Successful!");
      user.value = null;
      router.push("/");
    })
    .catch((error) => {
      console.error("Logout error:", error.code);
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
  min-width: 400px;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
}

.user-info {
  padding: 20px 0;
}

.user-info p {
  margin-bottom: 20px;
  font-size: 16px;
}

.role-badge {
  margin: 15px 0;
}

.badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.admin-badge {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
}

.user-badge {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  box-shadow: 0 2px 8px rgba(78, 205, 196, 0.3);
}

.not-signed-in {
  padding: 20px 0;
}

.not-signed-in p {
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
}

.logout-btn {
  background: linear-gradient(135deg, #dc3545, #c82333);
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

.logout-btn:hover {
  background: linear-gradient(135deg, #c82333, #a71e2a);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
}

.btn-link {
  background: linear-gradient(135deg, #275fda, #4285f4);
  color: white;
  text-decoration: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
  min-width: 200px;
}

.btn-link:hover {
  background: linear-gradient(135deg, #1e4bb8, #3367d6);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(39, 95, 218, 0.3);
  text-decoration: none;
  color: white;
}
</style>
