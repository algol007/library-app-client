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
        <td><img :src="cart.bookCart.image" alt="book" width="60" height="80"></td>
        <td>{{ cart.bookCart.title }}</td>
        <td>{{ cart.createdAt.slice(0,10) }}</td>
        <td v-if="cart.status == 0">Pending</td>
        <td v-if="cart.status == 1">Borrow</td>
        <td v-if="cart.status == 2">Return</td>
        <td v-if="cart.status == 3" class="text-danger">Penalty</td>
        <td v-if="user.role=='admin'" class="buttons are-small">
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
        <td v-if="user.role=='user'">
          <button class="button is-info is-small" @click="seeDetail(cart.bookCart.id)">
            Detail</button>
        </td>
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
    this.readUserCart(this.local.user);
  },
  computed: {
    ...mapState('cart', ['carts']),
    ...mapState('user', ['user', 'local']),
  },
};
</script>

<style scoped>
</style>
