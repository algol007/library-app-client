<template>
    <section>
      <Navbar2 />
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
                <h3>{{ user.name }}</h3>
                <h5 class="user-email">{{ user.email }}</h5>
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
                <!-- <span class="error-message" v-if="this.message1.length">{{ this.message1 }}
                  </span> -->
              </div>
              <div class="field">
                <label class="label">Confirm Password</label>
                <div class="control">
                  <input class="input" type="password" placeholder="Confirm Password" required
                  v-model="password2">
                </div>
                <!-- <span class="error-message" v-if="this.message2.length">{{ this.message2 }}
                  </span> -->
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
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import Navbar2 from '../components/Navbar2.vue';

export default {
  name: 'Profile',
  components: {
    Navbar2,
  },
  data() {
    return {
      password: '',
      password2: '',
      image: '',
    };
  },
  computed: {
    img() {
      return {
        backgroundImage: `url(${this.user.image})`,
      };
    },
    ...mapState('user', ['user', 'local']),
  },
  methods: {
    ...mapActions('user', ['readUser']),
    upload() {
      const file = this.$refs.file.files[0];
      this.image = file;
    },
    editProfile() {
      const profile = document.querySelector('.edit');
      profile.style.display = 'block';
    },
    cancelEdit() {
      const profile = document.querySelector('.edit');
      profile.style.display = 'none';
    },
    updateProfile(e) {
      e.preventDefault();
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
          .put(process.env.VUE_APP_BASE_URL + 'user/' + this.user.id, // eslint-disable-line
            formData, { headers: { 'baca-bismillah': this.local.token } })
          .then(() => {
            this.$swal.fire({
              icon: 'success',
              html: 'Profile has been updated!',
              showConfirmButton: false,
              timer: 3000,
            });
            this.readUser(this.local.user);
            this.cancelEdit();
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
