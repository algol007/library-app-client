<template>
  <div>
    <Navbar2 />
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Borrow History
        </p>
        <div class="card-header-icon" aria-label="more options">
          <span>Total data : <b>1</b></span>
        </div>
      </header>
      <div class="card-content">
        <div class="table-container content">
          <Table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar2 from '../components/Navbar2.vue';
import Table from '../components/Table.vue';

export default {
  name: 'History',
  components: {
    Navbar2,
    Table,
  },
  methods: {},
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
