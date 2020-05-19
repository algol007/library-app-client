<template>
  <section class="sidebar">
    <!-- Toggle Button -->
    <div class="menu-button">
      <button class="sidebar-button" @click="sidebarHide">
        <img src="../assets/img/menu.png" alt="toggle-menu" />
      </button>
    </div>
    <div class="profile">
      <div class="profile-img" :style="img">
      </div>
      <h4>{{ this.user.name }}</h4>
    </div>
    <div class="sidebar-menu">
      <p><router-link to="/profile" class="menu-list">My Profile</router-link></p>
      <p><router-link to="/history" class="menu-list">History</router-link></p>
      <p data-toggle="modal" @click="showModal" v-if="this.user.role == 'admin'">Add Book</p>
      <p @click="logout">Logout</p>
    </div>
    <!-- Sidebar Menu -->
    <Modal modalTitle="Add Book">
      <form @submit="addBook" class="modal-card-body">
        <div class="form-login">
          <label for="title">Title</label>
          <input name="Title" id="title" placeholder="Title" v-model="book.title" required/>
        </div>
        <div class="form-login">
          <label for="image">Image</label>
          <input type="file" name="image" id="image" ref="file" @change="upload"
          required/>
        </div>
        <div class="form-login">
          <label for="author">Author</label>
          <input name="author" id="author" placeholder="Author" v-model="book.author" required/>
        </div>
        <div class="form-login">
          <label for="isbn">ISBN</label>
          <input name="isbn" id="isbn" placeholder="ISBN" v-model="book.isbn" required/>
        </div>
        <div class="form-login">
          <label for="totalPage">Total Page</label>
          <input type="number" name="totalPage" id="totalPage" placeholder="Total Page"
          v-model="book.totalPage"
          required/>
        </div>
        <div class="form-login">
          <label for="categoryId">Category</label>
          <select name="categoryId" id="categoryId" v-model="book.categoryId" required>
            <option value="1">Novel</option>
            <option value="2">Komik</option>
            <option value="3">Sastra</option>
            <option value="4">Bisnis</option>
            <option value="5">Travel</option>
            <option value="6">Design</option>
            <option value="7">Sejarah</option>
            <option value="8">Hukum</option>
            <option value="9">Matematika</option>
            <option value="10">Teknologi</option>
            <option value="11">Majalah</option>
            <option value="12">Fiksi</option>
          </select>
        </div>
        <div class="form-login">
          <label for="price">Price</label>
          <input type="number" name="price" id="price" placeholder="Price" v-model="book.price"
          required/>
        </div>
        <div class="form-login">
          <label for="language">Language</label>
          <input name="language" id="language" placeholder="Language" v-model="book.language"
          required/>
        </div>
        <div class="form-login">
          <label for="publishedBy">Publisher</label>
          <input name="publishedBy" id="publishedBy" placeholder="Publisher"
          v-model="book.publishedBy" required/>
        </div>
        <div class="form-login">
          <label for="publishedAt">Published On</label>
          <input name="publishedAt" id="publishedAt" placeholder="Published On"
          v-model="book.publishedAt" required/>
        </div>
        <div class="form-login">
          <label for="description">Description</label>
          <textarea name="description" id="description" placeholder="Description"
          v-model="book.description"
          rows="5" required/>
        </div>
        <footer class="button-save">
          <button class="button is-warning" type="submit">
            Save</button>
        </footer>
      </form>
    </Modal>
  </section>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import Modal from './Modal.vue';

export default {
  name: 'Sidebar',
  components: {
    Modal,
  },
  data() {
    return {
      book: {
        title: null,
        image: null,
        author: null,
        isbn: null,
        totalPage: null,
        categoryId: null,
        price: null,
        description: null,
        language: null,
        publishedBy: null,
        publishedAt: null,
      },
    };
  },
  methods: {
    ...mapActions('user', ['readUser', 'signout']),
    ...mapActions('book', ['readAllBooks']),
    upload() {
      const file = this.$refs.file.files[0];
      this.book.image = file;
    },
    logout() {
      localStorage.removeItem('items');
      this.signout();
      this.$router.push('/auth/login');
    },
    showModal() {
      const modal = document.querySelector('.modal');
      modal.classList.toggle('is-active');
    },
    sidebarHide() {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('show-sidebar');
      // console.log('Sidebar');
    },
    addBook(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', this.book.title);
      formData.append('image', this.book.image);
      formData.append('author', this.book.author);
      formData.append('isbn', this.book.isbn);
      formData.append('totalPage', this.book.totalPage);
      formData.append('categoryId', this.book.categoryId);
      formData.append('price', this.book.price);
      formData.append('description', this.book.description);
      formData.append('language', this.book.language);
      formData.append('publishedBy', this.book.publishedBy);
      formData.append('publishedAt', this.book.publishedAt);
      axios
        .post(process.env.VUE_APP_BASE_URL + 'admin/book', formData, // eslint-disable-line
          { headers: { 'baca-bismillah': this.local.token } })
        .then((res) => {
          console.log(res);
          this.$swal.fire({
            icon: 'success',
            html: `Book ${this.book.title} has been created!`,
            showConfirmButton: false,
            timer: 3000,
          });
          this.sidebarHide();
          this.showModal();
          this.readAllBooks({ page: 1, data: '' });
        });
    },
  },
  computed: {
    img() {
      return {
        backgroundImage: `url(${this.user.image})`,
      };
    },
    ...mapState('user', ['local', 'user']),
  },
  mounted() {
    this.readUser(this.local.user);
  },
};
</script>
<style>
  .none{
    display: none !important;
  }
  .sidebar-button{
    border: none;
    cursor: pointer;
  }
  .sidebar {
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    min-height: 900px;
    height: 100vh;
    background: #ffffff;
    text-align: center;
    padding: 50px 0;
    position: fixed;
    /* display: none; */
    transition: 1s;
    z-index: 2;
    margin-left: -300px;
    box-shadow: none;
  }
  .show-sidebar {
    margin-left: 0px;
    box-shadow: 3px 2px 20px #999999;
    transition: 1s;
  }
  .profile-img{
    margin: 0 auto;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-size: cover;
    background-position: center center;
  }
  .sidebar .menu-button {
    text-align: right;
    position: absolute;
    top: 20px;
    left: 240px;
  }
  .menu-button button {
    background: none;
  }
  .sidebar .profile {
    margin: 10px 0;
  }
  .profile h4 {
    font-size: 20px;
    font-weight: bold;
    margin-top: 1em;
    margin-bottom: 2em;
  }
  .sidebar .sidebar-menu {
    text-align: left;
    margin-top: 20px;
  }
  .sidebar-menu{
    padding: 0 30px;
  }
  .sidebar-menu p{
    margin: 1em 0;
  }
  .sidebar-menu p, .menu-list {
    color: #000000 !important;
    cursor: pointer;
    font-size: 1em;
    display: flex;
    flex-direction: column;
    transition: 0.5s;
  }
  .sidebar-menu p:hover, .menu-list {
    color: #424242;
    transition: 0.5s;
  }
  .search-box {
    width: 100%;
    flex-direction: row;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #ced4da;
    display: none;
  }
  .search-box input{
    width: 100%;
    margin-left: 10px;
    border: none;
    outline: none;
  }
  .button-save{
    padding: 20px 0;
    display: flex;
    flex-direction: row-reverse;
  }
  @media (max-width: 450px) {
    .search-box {
      display: flex;
    }
  }
</style>
