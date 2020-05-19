<template>
  <div class="dashboard">
    <Navbar @title="sortByTitle" @author="sortByAuthor" @newest="newest" @latest="latest"
    @search="search" />
    <Slider class="slider" />
    <div class="book">
      <h1>List Book</h1>
      <div class="list-book">
        <div class="cards" v-for="data in books" :key="data.id">
          <router-link :to="'book/detail/' + data.id">
          <Card :bookTitle="data.title" :bookAuthor="data.author" :image="data.image"
          :year="data.publishedAt" />
          </router-link>
        </div>
      </div>
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <ul class="pagination-list">
          <li><a class="pagination-previous" @click="prevPages">Previous</a></li>
          <li><a class="pagination-next" @click="nextPages">Next page</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Slider from '../components/Slider.vue';
import Card from '../components/Card.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Dashboard',
  components: {
    Slider,
    Card,
    Navbar,
  },
  data() {
    return {
      items: [],
      isLogin: false,
      page: 1,
    };
  },
  created() {
    this.getLocalData();
  },
  methods: {
    ...mapActions('user', ['getLocalData']),
    ...mapActions('book', ['readAllBooks']),
    sortByTitle() {
      this.readAllBooks({ page: this.page, data: '&title=ASC' });
    },
    sortByAuthor() {
      this.readAllBooks({ page: this.page, data: '&author=ASC' });
    },
    search(data) {
      // console.log(data);
      this.readAllBooks({ page: this.page, data: '&search=' + data }); // eslint-disable-line
    },
    newest() {
      this.readAllBooks({ page: this.page, data: '&year=DESC' });
    },
    latest() {
      this.readAllBooks({ page: this.page, data: '&year=ASC' });
    },
    nextPages() {
      this.page += 1;
      this.readAllBooks({ page: this.page, data: this.sort });
    },
    prevPages() {
      this.page -= 1;
      this.readAllBooks({ page: this.page, data: this.sort });
    },
  },
  mounted() {
    this.readAllBooks({ page: this.page, data: '' });
  },
  computed: {
    ...mapState('book', ['books', 'sort']),
    ...mapState('user', ['local']),
  },
};
</script>

<style scoped>
  .book{
    padding: 50px 80px;
  }
  .book h1{
    transition: 0.5s;
    font-size: 2em;
  }
  .list-book{
    display: flex;
    justify-content: center;
    margin-top: 30px;
    flex-wrap: wrap;
  }
  .list-book h1{
    display: block;
  }
  .pagination{
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .pagination-link, .pagination-next, .pagination-previous{
    cursor: pointer;
  }
  .pagination-next, .pagination-previous{
    margin: 0 20px;
  }
  .custom-navbar{
    background-color: #ffffff;
    z-index: 2;
    position: fixed;
    width: 100%;
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
  .search-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    border-radius: 20px;
    border: 1px solid #ced4da;
    transition: 1s;
  }
  .search-box input{
    width: 100%;
    margin-left: 10px;
    border: none;
    outline: none;
  }
  .navbar-brand, .button-login{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navbar-brand img{
    margin-right: 10px;
  }
  .navbar-brand .back-home{
    color: #424242;
  }
  .dropdown-item{
    cursor: pointer;
  }
  @media (max-width: 768px) {
    .sort-book {
      display: none;
    }
    .book {
      padding: 50px 30px;
    }
    .book h1{
      font-size: 1.5em;
    }
  }
  @media (max-width: 450px) {
    .search-box {
      display: none;
    }
  }
</style>
