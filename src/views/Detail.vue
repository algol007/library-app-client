<template>
  <section id="detail">
    <!-- <DetailBook image="image" /> -->
    <div class="detail-header">
      <div class="detail-nav">
        <div class="nav-back">
          <router-link to="/"><div class="back"></div></router-link>
        </div>
        <div class="nav-option" v-if="this.items.role == 'admin'">
          <button @click="showModal">Edit</button>
          <button @click="deleteBook">Delete</button>
        </div>
      </div>
      <div class="detail-cover" :style="img"></div>
      <div class="detail-book" :style="img"></div>
    </div>
    <div class="description">
      <div class="column is-9 desc">
        <div class="availability">
          <div class="column desc-box">
            <div class="category">
              <button class="button is-rounded is-warning">
                {{ this.name }}
                </button>
            </div>
            <div class="desc-title">{{ book.title }}</div>
            <div class="desc-subtitle">{{ book.author }}</div>
          </div>
          <div class="column status">
            <p>Available</p>
          </div>
        </div>
        <div class="desc-text">
          <p>
            {{ book.description }}
          </p>
        </div>
      </div>
      <div class="column is-2 button-borrow">
        <button class="button is-warning" @click="addBorrow">Borrow</button>
      </div>
    </div>

    <!-- Modal -->

  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Book</p>
        <button class="delete" aria-label="close" @click="showModal"></button>
      </header>
      <form @submit="updateBook" class="modal-card-body">
        <div class="form-login">
          <label for="title">Title</label>
          <input name="Title" id="title" v-model="book.title" required/>
        </div>
        <div class="form-login">
          <label for="image">Image</label>
          <input name="image" id="image" v-model="book.image" required/>
        </div>
        <div class="form-login">
          <label for="author">Author</label>
          <input name="author" id="author" v-model="book.author" required/>
        </div>
        <div class="form-login">
          <label for="isbn">ISBN</label>
          <input name="isbn" id="isbn" v-model="book.isbn" required/>
        </div>
        <div class="form-login">
          <label for="totalPage">Total Page</label>
          <input type="number" name="totalPage" id="totalPage" v-model="book.totalPage"
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
          <input type="number" name="price" id="price" v-model="book.price" required/>
        </div>
        <div class="form-login">
          <label for="language">Language</label>
          <input name="language" id="language" v-model="book.language" required/>
        </div>
        <div class="form-login">
          <label for="publishedBy">Publisher</label>
          <input name="publishedBy" id="publishedBy" v-model="book.publishedBy" required/>
        </div>
        <div class="form-login">
          <label for="publishedAt">Published On</label>
          <input name="publishedAt" id="publishedAt" v-model="book.publishedAt" required/>
        </div>
        <div class="form-login">
          <label for="description">Description</label>
          <textarea name="description" id="description" v-model="book.description"
          rows="5" required/>
        </div>
        <footer class="button-save">
          <button class="button is-warning">Save</button>
        </footer>
      </form>
    </div>
  </div>

  </section>
</template>

<script>
import axios from 'axios';
// import DetailBook from '../components/templates/Detail.vue';

export default {
  name: 'Detail',
  data() {
    return {
      book: [],
      bookId: null,
      isLogin: false,
      items: [],
      name: null,
      url: process.env.VUE_APP_BASE_URL,
      page: null,
    };
  },
  created() {
    this.items = { role: 'user' };
    const local = JSON.parse(localStorage.getItem('items'));
    if (local) {
      this.items = local;
    }
  },
  methods: {
    showModal() {
      const modal = document.querySelector('.modal');
      modal.classList.toggle('is-active');
      // console.log(this.book.bookCategory);
    },
    deleteBook() {
      this.$swal.fire({
        html: `Are you sure to delete book ${this.book.title}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
        .then((result) => {
          if (result.value) {
            this.page = 'admin/book/';
            axios
              .delete(this.url + this.page + this.$route.params.id,
                { headers: { 'baca-bismillah': this.items.token } })
              .then(() => {
                // console.log(res);
                this.$swal.fire({
                  icon: 'success',
                  html: `Book ${this.book.title} has been deleted!`,
                  showConfirmButton: false,
                  timer: 3000,
                });
                this.$router.push('/');
              });
          }
        });
    },
    updateBook() {
      this.page = 'admin/book/';
      axios
        .put(this.url + this.page + this.$route.params.id, {
          title: this.book.title,
          image: this.book.image,
          author: this.book.author,
          isbn: this.book.isbn,
          totalPage: this.book.totalPage,
          categoryId: this.book.categoryId,
          price: this.book.price,
          description: this.book.description,
          language: this.book.language,
          publishedBy: this.book.publishedBy,
          publishedAt: this.book.publishedAt,
        },
        { headers: { 'baca-bismillah': this.items.token } })
        .then(() => {
          // console.log(${this.$route.params.id});
          // console.log(res);
          this.$swal.fire({
            icon: 'success',
            html: `Book ${this.book.title} has been updated!`,
            showConfirmButton: false,
            timer: 3000,
          });
          const modal = document.querySelector('.modal');
          modal.classList.toggle('is-active');
          this.$router.go();
        })
        .catch(() => {
          // console.log('Error when load data!');
        });
    },
    getBookById() {
      this.page = 'book/';
      axios.get(this.url + this.page + this.$route.params.id)
        .then((res) => {
          this.book = res.data.data;
          this.name = this.book.bookCategory.name;
          // console.log(this.book.image);
        })
        .catch(() => {
          // console.log(err);
        });
    },
    addBorrow() {
      if (this.items.isLogin === true) {
        this.bookId = this.$route.params.id;
        this.page = 'cart';
        axios
          .post(this.url + this.page, {
            bookId: this.bookId,
            userId: this.items.id,
            status: 0,
          },
          { headers: { 'baca-bismillah': this.items.token } })
          .then(() => {
            // console.log(res);
            this.$swal.fire({
              icon: 'success',
              html: `Book ${this.book.title} has been borrowed!`,
              showConfirmButton: false,
              timer: 3000,
            });
          })
          .catch(() => {
            // console.log(err);
          });
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'You cannot borrow this book',
          text: 'Please login first!',
          footer: "<a href='http://localhost:8080/auth/login'>Go to login page..</a>",
        });
      }
    },
  },
  computed: {
    img() {
      // const original = this.book.image;
      // const image = original.replace(/ /g, '%');
      return {
        backgroundImage: `url(${this.book.image})`,
        // backgroundImage: `url(${image})`,
      };
    },
  },
  mounted() {
    this.getBookById();
  },
};
</script>

<style>
  .detail-nav{
    width: 100%;
    padding: 10px 20px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .back{
    height: 40px;
    width: 40px;
    background-color: white;
    background-image: url('../assets/img/Arrow.png');
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 50%;
    cursor: pointer;
  }
  .nav-option button{
    padding: 0 10px;
    background: none;
    border: none;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
    outline: none;
  }
  .detail-cover{
    background-color: #424242;
    width: 100%;
    height: 400px;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .detail-book{
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 200px;
    height: 300px;
    background-color: salmon;
    /* background-image: url(`${this.book.image}`); */
    position: absolute;
    top: 250px;
    right: 50px;
  }
  .description{
    padding: 40px 90px;
    justify-content: space-between;
    display: flex;
  }
  .availability{
    display: flex;
    align-items: center;
  }
  .desc-box{
    flex-direction: column;
  }
  .status{
    display: flex;
    flex-direction: row-reverse;
    color: #48c744;
    font-size: 20px;
  }
  .desc-title{
    margin-top: 20px;
    font-size: 40px;
  }
  .desc-subtitle{
    font-size: 20px;
  }
  .desc-text{
    margin-top: 20px;
  }
  .button-borrow{
    padding-bottom: 50px !important;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .modal{
    padding: 0 20px;
  }
  .modal-card-foot{
    display: flex;
    flex-direction: row-reverse;
  }
  .form-login{
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }
  .form-login label{
    width: 20%;
    text-align: right;
    padding-right: 10px;
  }
  .form-login input, .form-login textarea, .form-login select{
    border-radius: 5px;
    width: 80% !important;
    padding: 10px;
    border: 1px solid #d0cccc;
    font-size: 14px;
    background-color: transparent;
  }

  @media (max-width: 992px) {
    .description {
      flex-direction: column;
      margin-top: 150px;
    }
    .desc{
      width: 100% !important;
    }
    .button-borrow{
      /* padding-left: 0.75rem !important; */
      justify-content: flex-start;
    }
  }
  @media (max-width: 768px) {
    .availability{
      flex-direction: column;
    }
    .availability .column{
      display: flex;
      width: 100%;
    }
    .status{
      flex-direction: row;
    }
  }
  @media (max-width: 576px) {
    .description{
      padding: 40px 20px;
    }
  }
</style>
