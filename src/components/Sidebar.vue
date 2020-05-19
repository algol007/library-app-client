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
    <Modal modalTitle="Add Book" @clicked="addBook" />
  </section>
</template>

<script>
// import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import Modal from './Modal.vue';

export default {
  name: 'Sidebar',
  components: {
    Modal,
  },
  methods: {
    ...mapActions('user', ['readUser', 'removeLocalData']),
    logout() {
      localStorage.removeItem('items');
      this.removeLocalData();
      this.$router.push('/auth/login');
    },
    sidebarHide() {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('show-sidebar');
      // console.log('Sidebar');
    },
    addBook(e, data) {
      e.preventDefault();
      console.log(data);
      // const formData = new FormData();
      // formData.append('title', this.title);
      // formData.append('image', this.image);
      // formData.append('author', this.author);
      // formData.append('isbn', this.isbn);
      // formData.append('totalPage', this.totalPage);
      // formData.append('categoryId', this.categoryId);
      // formData.append('price', this.price);
      // formData.append('description', this.description);
      // formData.append('language', this.language);
      // formData.append('publishedBy', this.publishedBy);
      // formData.append('publishedAt', this.publishedAt);
      // const addBook = 'admin/book';
      // axios
      //   .post(this.url + addBook, formData,
      //     { headers: { 'baca-bismillah': this.items.token } })
      //   .then(() => {
      //     // console.log(res);
      //     this.$router.go();
      //     this.$swal.fire({
      //       icon: 'success',
      //       html: `Book ${this.title} has been created!`,
      //       showConfirmButton: false,
      //       timer: 3000,
      //     });
      //     const modal = document.querySelector('.modal');
      //     const sidebar = document.querySelector('.sidebar');
      //     modal.classList.toggle('is-active');
      //     sidebar.classList.toggle('show-sidebar');
      //   });
    },
    showModal() {
      const modal = document.querySelector('.modal');
      modal.classList.toggle('is-active');
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
