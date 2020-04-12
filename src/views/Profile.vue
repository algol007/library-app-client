<template>
    <section>
      <Navbar />
      <div class="my-profile profile">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              My Profile
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="user-photo" :style="img">
              </div>
              <div class="user-profile">
                <h3>{{ this.user.name }}</h3>
                <h5 class="user-email">{{ this.user.email }}</h5>
              </div>
            </div>
            <button class="button is-fullwidth is-success" @click="editProfile">
              Edit Profile</button>
          </div>
        </div>
      </div>
      <div class="my-profile edit">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Edit Profile
            </p>
          </header>
          <div class="card-content">
            <form @submit="updateProfile" class="edit-content">
              <div class="field">
                <label class="label">Photo Profile</label>
                <div class="control">
                  <input class="input" type="file" ref="file" @change="upload" required>
                </div>
              </div>
              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input class="input" type="email" disabled v-model="user.email">
                </div>
              </div>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" required v-model="user.name">
                </div>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" type="password" placeholder="New Password" required
                  v-model="password">
                </div>
                <span class="error-message" v-if="this.message1.length">{{ this.message1 }}</span>
              </div>
              <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control">
                  <input class="input" type="password" placeholder="Confirm Password" required
                  v-model="password2">
                </div>
                <span class="error-message" v-if="this.message2.length">{{ this.message2 }}</span>
              </div>
              <hr>
              <button class="button is-half is-success save">Save Profile</button>
              <button class="button is-half is-danger" @click="cancelEdit">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'Profile',
  components: {
    Navbar,
  },
  data() {
    return {
      items: [],
      url: process.env.VUE_APP_BASE_URL,
      user: [],
      page: null,
      password: null,
      password2: null,
      message1: [],
      message2: [],
      image: null,
    };
  },
  watch: {
    password(value) {
      this.password = value;
      // console.log(value);
      this.checkPassword(value);
    },
    password2(value) {
      this.password2 = value;
      // console.log(value);
      this.checkPassword2(value);
    },
  },
  computed: {
    img() {
      return {
        backgroundImage: `url(${this.user.image})`,
      };
    },
  },
  created() {
    this.items = JSON.parse(localStorage.getItem('items'));
  },
  mounted() {
    this.getUserById();
  },
  methods: {
    upload() {
      const file = this.$refs.file.files[0];
      this.image = file;
    },
    checkPassword(value) {
      if (value.length < 4) {
        this.message1 = 'Password must contains at least 4 characters';
      } else {
        this.message1 = '';
      }
    },
    checkPassword2(value) {
      if (value.length < 4) {
        this.message2 = 'Password must contains at least 4 characters';
      } else {
        this.message2 = '';
      }
    },
    getUserById() {
      this.page = 'user/';
      axios
        .get(this.url + this.page + this.items.id)
        .then((res) => {
          this.user = res.data.user;
          this.name = res.data.user.name;
          this.email = res.data.user.email;
        })
        .catch(() => {
          // console.log('Error when load data!');
        });
    },
    editProfile() {
      const profile = document.querySelector('.edit');
      profile.style.display = 'block';
      // console.log('Hello');
    },
    cancelEdit() {
      const profile = document.querySelector('.edit');
      profile.style.display = 'none';
      // console.log('Hello');
    },
    updateProfile(event) {
      event.preventDefault();
      this.page = 'user/';
      if (this.password !== this.password2) {
        this.$swal.fire({
          icon: 'error',
          html: 'Password not match!',
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        const formData = new FormData();
        formData.append('name', this.user.name);
        formData.append('email', this.user.email);
        formData.append('password', this.password);
        formData.append('image', this.image);
        axios
          .put(this.url + this.page + this.items.id, formData,
            { headers: { 'baca-bismillah': this.items.token } })
          .then(() => {
            this.$swal.fire({
              icon: 'success',
              html: 'Profile has been updated!',
              showConfirmButton: false,
              timer: 3000,
            });
            this.$router.go();
          })
          .catch(() => {

          });
      }
    },
  },
};
</script>

<style scoped>
  .my-profile{
    width: 60%;
    margin: 0 auto;
    transition: 0.5s;
    margin-bottom: 20px;
  }
  .edit{
    display: none;
  }
  .content{
    display: flex;
  }
  .user-profile{
    padding-left: 20px;
  }
  .user-photo{
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-size: cover;
    background-position: center center;
  }
  .user-email{
    color: #696969;
  }
  .error-message{
    color: rgb(250, 0, 0);
    font-size: 14px;
    padding-left: 10px;
  }
  .save{
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    .my-profile{
      width: 80%;
    }
  }
  @media (max-width: 576px) {
    .my-profile{
      width: 90%;
    }
  }
</style>
