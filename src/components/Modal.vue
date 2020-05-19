<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button class="delete" aria-label="close" @click="showModal"></button>
      </header>
      <form @submit="$emit('clicked', this.book)" class="modal-card-body">
        <div class="form-login">
          <label for="title">Title</label>
          <input name="Title" id="title" placeholder="Title" v-model="book.title" required/>
        </div>
        <div class="form-login">
          <label for="image">Image</label>
          <input type="file" name="image" id="image" ref="file" @change="upload"
          required/>
        </div>
        <div class="form-login">
          <label for="author">Author</label>
          <input name="author" id="author" placeholder="Author" v-model="book.author" required/>
        </div>
        <div class="form-login">
          <label for="isbn">ISBN</label>
          <input name="isbn" id="isbn" placeholder="ISBN" v-model="book.isbn" required/>
        </div>
        <div class="form-login">
          <label for="totalPage">Total Page</label>
          <input type="number" name="totalPage" id="totalPage" placeholder="Total Page"
          v-model="book.totalPage"
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
          <input type="number" name="price" id="price" placeholder="Price" v-model="book.price"
          required/>
        </div>
        <div class="form-login">
          <label for="language">Language</label>
          <input name="language" id="language" placeholder="Language" v-model="book.language"
          required/>
        </div>
        <div class="form-login">
          <label for="publishedBy">Publisher</label>
          <input name="publishedBy" id="publishedBy" placeholder="Publisher"
          v-model="book.publishedBy" required/>
        </div>
        <div class="form-login">
          <label for="publishedAt">Published On</label>
          <input name="publishedAt" id="publishedAt" placeholder="Published On"
          v-model="book.publishedAt" required/>
        </div>
        <div class="form-login">
          <label for="description">Description</label>
          <textarea name="description" id="description" placeholder="Description"
          v-model="book.description"
          rows="5" required/>
        </div>
        <footer class="button-save">
          <button class="button is-warning" type="submit">
            Save</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: [
    'modalTitle',
  ],
  data() {
    return {
      book: {
        title: null,
        image: null,
        author: null,
        isbn: null,
        totalPage: null,
        categoryId: null,
        price: null,
        description: null,
        language: null,
        publishedBy: null,
        publishedAt: null,
      },
    };
  },
  methods: {
    upload() {
      const file = this.$refs.file.files[0];
      this.image = file;
    },
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
