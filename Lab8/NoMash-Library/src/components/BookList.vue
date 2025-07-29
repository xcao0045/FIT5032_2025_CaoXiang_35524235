<template>
    <div class="book-list-container">
        <h2>Top 5 Books with ISBN > 1000 (Sorted by ISBN)</h2>
        <div v-for="book in books" :key="book.id" class="book-card">
            <div v-if="editingBook?.id !== book.id" class="book-display">
                <span class="book-info">{{ book.name }} - ISBN: {{ book.isbn }}</span>
                <div class="book-actions">
                    <button @click="startEdit(book)" class="edit-btn">Edit</button>
                    <button @click="deleteBook(book.id)" class="delete-btn">Delete</button>
                </div>
            </div>
            <div v-else class="book-edit">
                <input 
                    v-model="editForm.name" 
                    type="text" 
                    placeholder="Book name"
                    class="edit-input"
                />
                <input 
                    v-model="editForm.isbn" 
                    type="text" 
                    placeholder="ISBN"
                    class="edit-input"
                />
                <div class="edit-actions">
                    <button @click="saveEdit(book.id)" class="save-btn">Save</button>
                    <button @click="cancelEdit" class="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
        <div v-if="books.length < 5" class="book-count-notice">
            Not enough books with ISBN > 1000
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../firebase/init.js'
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, orderBy, limit } from 'firebase/firestore'

const books = ref([])
const editingBook = ref(null)
const editForm = ref({
    name: '',
    isbn: ''
})

const fetchBooks = async () => {
    try {
        const q = query(
            collection(db, 'books'),
            where('isbn', '>', 1000),
            orderBy('isbn', 'asc'),
            limit(5)
        )
        
        const querySnapshot = await getDocs(q)
        const booksList = []
        
        querySnapshot.forEach((doc) => {
            booksList.push({
                id: doc.id,
                ...doc.data()
            })
        })
        
        books.value = booksList
        console.log('Books fetched successfully:', booksList)
        
    } catch (error) {
        console.error('Error fetching books:', error)
    }
}

const deleteBook = async (bookId) => {
    if (confirm('Are you sure you want to delete this book?')) {
        try {
            await deleteDoc(doc(db, 'books', bookId))
            console.log('Book deleted successfully!')
            alert('Book deleted successfully!')
            
            await fetchBooks()
        } catch (error) {
            console.error('Error deleting book:', error)
            alert('Error deleting book. Please try again.')
        }
    }
}

const startEdit = (book) => {
    editingBook.value = book
    editForm.value = {
        name: book.name,
        isbn: book.isbn.toString()
    }
}

const cancelEdit = () => {
    editingBook.value = null
    editForm.value = { name: '', isbn: '' }
}

const saveEdit = async (bookId) => {
    try {
        const isbnValue = Number(editForm.value.isbn)
        if (isNaN(isbnValue)) {
            alert('ISBN must be a valid number!')
            return
        }
        
        await updateDoc(doc(db, 'books', bookId), {
            name: editForm.value.name,
            isbn: isbnValue
        })
        
        console.log('Book updated successfully!')
        alert('Book updated successfully!')
        
        editingBook.value = null
        editForm.value = { name: '', isbn: '' }
        
        await fetchBooks()
    } catch (error) {
        console.error('Error updating book:', error)
        alert('Error updating book. Please try again.')
    }
}

onMounted(() => {
    fetchBooks()
})
</script>

<style scoped>
.book-list-container {
    margin-top: 40px;
    padding: 20px;
}

h2 {
    color: #333;
    text-align: center;
    margin-bottom: 30px;
    font-weight: 600;
}

.book-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.book-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.book-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.book-info {
    flex: 1;
    font-size: 16px;
    padding-right: 5px;
}

.book-actions {
    display: flex;
    gap: 8px;
}

.edit-btn, .delete-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.edit-btn {
    background: #275fda;
    color: white;
}

.edit-btn:hover {
    background: #1e4bb8;
}

.delete-btn {
    background: #dc3545;
    color: white;
}

.delete-btn:hover {
    background: #c82333;
}

.book-edit {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.edit-input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.edit-input:focus {
    outline: none;
    border-color: #275fda;
    box-shadow: 0 0 0 2px rgba(39, 95, 218, 0.1);
}

.edit-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
}

.save-btn, .cancel-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.save-btn {
    background: #28a745;
    color: white;
}

.save-btn:hover {
    background: #218838;
}

.cancel-btn {
    background: #6c757d;
    color: white;
}

.cancel-btn:hover {
    background: #5a6268;
}

.book-count-notice {
    text-align: center;
    margin-top: 20px;
    padding: 10px;
    color: #6c757d;
    font-style: italic;
    font-size: 14px;
    border-top: 1px solid #e9ecef;
}
</style>
