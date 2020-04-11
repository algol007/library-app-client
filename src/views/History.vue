<template>
  <div>
    <Navbar />
    <div class="card">
  <header class="card-header">
    <p class="card-header-title">
      Borrow History
    </p>
    <div class="card-header-icon" aria-label="more options">
      <span>Total data : <b>{{ length }}</b></span>
    </div>
  </header>
  <div class="card-content">
    <div class="content">
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date Borrow</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-for="cart in carts" :key="cart.id">
          <tr>
            <td><img :src="cart.bookCart.image" alt="book" width="80" height="100"></td>
            <td>{{ cart.bookCart.title }}</td>
            <td>{{ cart.createdAt }}</td>
            <td v-if="cart.status == 0">Pending</td>
            <td v-if="cart.status == 1">Borrow</td>
            <td v-if="cart.status == 2">Return</td>
            <td v-if="role=='admin'" class="buttons are-small">
              <button class="button is-info" @click="cartApproved(cart.id)">
                Approved</button>
              <button class="button is-success" @click="cartReturned(cart.id)">
                Returned</button>
              <button class="button is-warning" @click="cartReset(cart.id)">
                Reset</button>
              <button class="button is-danger" @click="deleteCart(cart.id)">
                Delete</button>
            </td>
            <td v-if="role=='user'">
              <button class="button is-info is-small" @click="seeDetail(cart.bookCart.id)"
              v-if="role=='user'">Detail</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'History',
  components: {
    Navbar,
  },
  data() {
    return {
      carts: null,
      key: null,
      length: null,
      numbers: null,
      role: null,
      name: null,
      date: null,
      items: [],
      // bookId: null,
    };
  },
  created() {
    this.items = JSON.parse(localStorage.getItem('items'));
    this.role = this.items.role;
  },
  methods: {
    getUserById() {
      axios
        .get(`http://localhost:5000/api/library/user/${this.items.id}`)
        .then((res) => {
          this.name = res.data.user.name;
          // console.log(this.role);
        })
        .catch(() => {
          // console.log('Error when load data!');
        });
    },
    getAllUserCart() {
      axios
        .get('http://localhost:5000/api/library/cart')
        .then((res) => {
          this.carts = res.data.carts;
          this.length = this.carts.length;
          console.log(this.length);
        })
        .catch(() => {
          // console.log('Error when load data!');
        });
    },
    getAllCart() {
      axios
        .get(`http://localhost:5000/api/library/user/cart/${this.items.id}`)
        .then((res) => {
          this.carts = res.data.carts;
          console.log(this.carts);
        })
        .catch(() => {
          // console.log('Error when load data!');
        });
    },
    cartReset(id) {
      axios
        .patch(`http://localhost:5000/api/library/cart/${id}`, {
          status: 0,
        },
        { headers: { 'baca-bismillah': this.items.token } })
        .then(() => {
          this.$router.go();
        })
        .catch(() => {
          // console.log('Error when load data!');
        });
    },
    cartApproved(id) {
      axios
        .patch(`http://localhost:5000/api/library/cart/${id}`, {
          status: 1,
        },
        { headers: { 'baca-bismillah': this.items.token } })
        .then(() => {
          this.$router.go();
        })
        .catch(() => {
          // console.log('Error when load data!');
        });
    },
    cartReturned(id) {
      axios
        .patch(`http://localhost:5000/api/library/cart/${id}`, {
          status: 2,
        },
        { headers: { 'baca-bismillah': this.items.token } })
        .then(() => {
          this.$router.go();
        })
        .catch(() => {
          // console.log('Error when load data!');
        });
    },
    seeDetail(id) {
      // console.log(id);
      this.$router.push(`/book/detail/${id}`);
    },
    deleteCart(id) {
      // console.log(id);
      this.$swal.fire({
        html: 'Are you sure to delete cart?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
        .then((result) => {
          if (result.value) {
            axios
              .delete(`http://localhost:5000/api/library/cart/${id}`,
                { headers: { 'baca-bismillah': this.items.token } })
              .then(() => {
                // console.log(res);
                this.$swal.fire({
                  icon: 'success',
                  html: 'Cart has been deleted!',
                  showConfirmButton: false,
                  timer: 3000,
                });
                this.$router.go();
              });
          }
        });
    },
  },
  mounted() {
    console.log(this.role);
    if (this.role === 'user') {
      this.getAllCart();
    } else {
      this.getAllUserCart();
    }
    this.getUserById();
  },
};
</script>
<style scoped>
  .book-image{
    width: 80px;
    height: 100px;
    background-color: teal;
  }
  .card{
    margin: 0 10px;
  }
  button{
    margin: 5px;
  }
  .lists{
    margin-top: 50px;
  }
</style>
