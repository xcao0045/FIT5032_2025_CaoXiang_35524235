<template>
    <div class="container">
        <div class="form-wrapper">
            <h1>Add New Book</h1>
            <form @submit.prevent="addBook">
                <div class="form-group">
                    <label for="isbn">ISBN:</label>
                    <input type="text" id="isbn" v-model="book.isbn" placeholder="Enter ISBN number" required />
                </div>
                <div class="form-group">
                    <label for="name">Book Name:</label>
                    <input type="text" id="name" v-model="book.name" placeholder="Enter book name" required />
                </div>
                <button type="submit" class="add-btn">Add Book to Library</button>
            </form>
        </div>
        <BookList />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'
import BookList from '../components/BookList.vue'

const book = ref({
    isbn: '',
    name: ''
})

const addBook = async () => {
    try {
        const isbnValue = Number(book.value.isbn);
        if (isNaN(isbnValue)) {
            alert('ISBN must be a valid number!');
            return;
        }
        
        await addDoc(collection(db, 'books'), {
            isbn: isbnValue,
            name: book.value.name
        })
        
        console.log('Book added successfully!')
        
        book.value.isbn = ''
        book.value.name = ''
        
        alert('Book added successfully!')
    } catch (error) {
        console.error('Error adding book:', error)
        alert('Error adding book. Please try again.')
    }
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 30px;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
  font-size: 16px;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #275fda;
  box-shadow: 0 0 0 3px rgba(39, 95, 218, 0.1);
}

input::placeholder {
  color: #6c757d;
}

.add-btn {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  margin-top: 10px;
}

.add-btn:hover {
  background: linear-gradient(135deg, #218838, #1ea888);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.add-btn:active {
  transform: translateY(0);
}
</style>