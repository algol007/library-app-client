<template>
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
        <!-- <td><img :src="cart.bookCart.image" alt="book" width="80" height="100"></td>
        <td>{{ cart.bookCart.title }}
          <p class="username">{{ cart.userCart.name }}</p>
        </td>
        <td>{{ cart.createdAt }}</td>
        <td v-if="cart.status == 0">Pending</td>
        <td v-if="cart.status == 1">Borrow</td>
        <td v-if="cart.status == 2">Return</td>
        <td v-if="cart.status == 3" class="text-danger">Penalty</td>
        <td v-if="role=='admin'" class="buttons are-small">
          <button class="button is-info" @click="cartApproved(cart.id)">
            Approved</button>
          <button class="button is-success" @click="cartReturned(cart.id)">
            Returned</button>
          <button class="button is-warning" @click="cartReset(cart.id)">
            Reset</button>
          <button class="button is-dark" @click="cartPenalty(cart.id)">
            Penalty</button>
          <button class="button is-danger" @click="deleteCart(cart.id)">
            Delete</button>
        </td>
        <td v-if="role=='user'">
          <button class="button is-info is-small" @click="seeDetail(cart.bookCart.id)"
          v-if="role=='user'">Detail</button>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Table',
  methods: {
    ...mapActions('cart', ['readUserCart']),
  },
  mounted() {
    this.readUserCart();
  },
  computed: {
    ...mapState('cart', ['carts']),
  },
};
</script>

<style scoped>
</style>
