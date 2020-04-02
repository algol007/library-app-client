<template>
  <div class="cart">
    <h1>Cart Page</h1>
    <button class="button is-primary trigger" v-on:click="showModal">Primary</button>
    <Modal />
    <h4>List Book</h4>
    <ul v-for="book in books" :key="book.id">
      <li>{{ book.title }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '../components/Modal.vue';

export default {
  name: 'Cart',
  components: {
    Modal,
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    showModal() {
      const modal = document.querySelector('.modal');
      modal.classList.toggle('is-active');
    },
    getAllBooks() {
      axios.get('http://localhost:5000/api/library/book')
        .then((res) => {
          this.books = res.data.books.rows;
          console.log(res.data.books.rows);
        })
        .catch(() => {
          console.log('Error when load data!');
        });
    },
  },
  mounted() {
    this.getAllBooks();
  },
};
</script>

<style></style>
