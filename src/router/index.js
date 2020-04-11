import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Detail from '../views/Detail.vue';
import History from '../views/History.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/book/detail/:id',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
