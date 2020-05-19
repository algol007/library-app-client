<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button class="delete" aria-label="close" @click="showModal"></button>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: [
    'modalTitle',
  ],
  methods: {
    showModal() {
      const modal = document.querySelector('.modal');
      modal.classList.toggle('is-active');
    },
  },
};
</script>

<style>
  .modal{
    padding: 0 20px;
  }
  .modal-card-foot{
    display: flex;
    flex-direction: row-reverse;
  }
</style>
