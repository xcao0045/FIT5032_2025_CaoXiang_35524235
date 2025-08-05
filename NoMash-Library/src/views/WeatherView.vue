<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
        />
        <button @click="searchByCity" class="search-button">
          Search
        </button>
      </div>
    </div>
    
    <main>
      <div v-if="weatherData">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from "axios"

const apikey = "65d1e4a55ee60a837bdd4e08ef01075f"

const city = ref('')
const weatherData = ref(null)
const hourlyForecast = ref([])
const dailyForecast = ref([])

const temperature = computed(() => {
  return weatherData.value
    ? Math.floor(weatherData.value.main.temp - 273)
    : null
})

const iconUrl = computed(() => {
  return weatherData.value
    ? `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
    : null
})

const fetchCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
      
      await fetchWeatherData(url)
    })
  }
}

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)
    weatherData.value = response.data
  } catch (error) {
    console.error("Error fetching weather data:", error)
  }
}

const searchByCity = async () => {
  if (city.value.trim()) {
    console.log('Searching for city:', city.value)
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`
    await fetchWeatherData(url)
  }
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
}

.header {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 400px;
  margin-bottom: 30px;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
}

.search-bar {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.search-input {
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  width: 250px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #275fda;
  box-shadow: 0 0 0 3px rgba(39, 95, 218, 0.1);
}

.search-button {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.search-button:hover {
  background: linear-gradient(135deg, #0056b3, #004085);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

main {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 400px;
}

main h2 {
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
}

main div {
  margin: 20px 0;
}

main img {
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  background: #f8f9fa;
  padding: 10px;
}

main p {
  font-size: 32px;
  font-weight: 700;
  margin: 15px 0;
  color: #333;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

main span {
  font-size: 18px;
  text-transform: capitalize;
  color: #666;
  font-weight: 500;
}
</style>