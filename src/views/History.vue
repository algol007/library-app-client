<template>
  <div class="history">
    <Navbar2 />
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Borrow History
        </p>
        <div class="card-header-icon" aria-label="more options">
          <span>Total data : <b>{{ carts.length }}</b></span>
        </div>
      </header>
      <div class="card-content">
        <div class="table-container content">
          <table class="table is-hoverable is-striped">
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
                <td><img :src="cart.bookCart.image" alt="book" width="60" height="80"></td>
                <td>{{ cart.bookCart.title }}
                  <p class="username" v-if="user.role == 'admin'">{{ cart.userCart.name }}</p></td>
                <td>{{ cart.createdAt.slice(0,10) }}</td>
                <td v-if="cart.status == 1">Pending</td>
                <td v-if="cart.status == 2">Borrow</td>
                <td v-if="user.role=='admin'" class="buttons are-small">
                  <button class="button is-info" @click="cartApproved(cart.id)">
                    Approved</button>
                  <button class="button is-success" @click="cartReturned(cart.id)">
                    Returned</button>
                </td>
                <td v-if="user.role=='user'">
                  <button class="button is-info is-small" @click="seeDetail(cart.bookCart.id)">
                    Detail</button>
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
import { mapState, mapActions } from 'vuex';
import Navbar2 from '../components/Navbar2.vue';

export default {
  name: 'History',
  components: {
    Navbar2,
  },
  methods: {
    ...mapActions('cart', ['readUserCart', 'readAllCarts']),
    cartApproved(id) {
      // console.log(id);
      this.$swal.fire({
        html: 'Are you sure to approve this book?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
        .then((result) => {
          if (result.value) {
            axios
              .patch(process.env.VUE_APP_BASE_URL + 'cart/' + id, // eslint-disable-line
                { status: 2 }, { headers: { 'baca-bismillah': this.local.token } })
              .then(() => {
                this.readAllCarts();
              });
          }
        });
    },
    cartReturned(id) {
      // console.log(id);
      this.$swal.fire({
        html: 'Are you sure to return this book?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
      })
        .then((result) => {
          if (result.value) {
            axios
              .patch(process.env.VUE_APP_BASE_URL + 'cart/' + id, // eslint-disable-line
                { status: 3 }, { headers: { 'baca-bismillah': this.local.token } })
              .then(() => {
                this.readAllCarts();
              });
          }
        });
    },
    seeDetail(id) {
      // console.log(id);
      this.$router.push(`/book/detail/${id}`);
    },
  },
  mounted() {
    if (this.local.user !== 2) {
      this.readUserCart(this.local.user);
    } else {
      this.readAllCarts();
    }
  },
  computed: {
    ...mapState('cart', ['carts']),
    ...mapState('user', ['user', 'local']),
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
  .username{
    font-size: 12px;
    color: #696969;
  }
  .text-danger{
    color: red;
  }
</style>
