<template>
  <nav class="columns is-gapless custom-navbar">
    <div class="toggle-menu" @click="sidebarShow">
      <img src="../assets/img/menu.png" alt="toggle-menu">
    </div>
    <div class="column navbar-brand">
      <router-link to="/">
      <img src="../assets/img/bookshelf.png" alt="logo" height="40px" width="40px">
      </router-link>
      <router-link to="/" class="back-home">Library</router-link>
    </div>
    <Sidebar />
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import Sidebar from './Sidebar.vue';

export default {
  name: 'Navbar2',
  components: {
    Sidebar,
  },
  methods: {
    sidebarShow() {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('show-sidebar');
    },
  },
  computed: {
    ...mapState('user', ['local', 'user']),
  },
};
</script>

<style scoped>
  .button-login{
    display: flex;
    justify-content: center;
  }
  .custom-navbar{
    max-width: 100%;
    align-items: center;
    box-shadow: 3px 2px 20px rgba(0, 0, 0, 0.2);
    margin: 0;
    padding: 5px 0 !important;
    display: flex;
  }
  .column{
    padding: 0 !important;
  }
  .custom-navbar .toggle-menu{
    margin: 0 30px;
  }
  .toggle-menu{
    cursor: pointer;
    width: 40px;
  }
  .column{
    display: flex;
    flex-direction: row;
  }
  .sort-book{
    display: flex;
    justify-content: center;
  }
  .button span{
    font-size: 14px;
  }
  .button{
    border: none;
  }
  .navbar-brand{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 30px !important;
  }
  .navbar-brand img{
    margin-right: 10px;
  }
  .logo {
    justify-content: center;
  }
  .navbar-brand .back-home{
    color: #424242;
  }
</style>
