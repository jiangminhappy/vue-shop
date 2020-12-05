import Vue from 'vue';
import VueRoter from 'vue-router';

Vue.use(VueRoter);

import Home from  '../views/home/Home';
import Detail from '../views/detail/Detail';
import Cart from '../views/cart/Cart';
import Profile from '../views/profile/Profile'


const routes = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/category',
  name: 'detail',
  component: Detail
}, {
  path: '/cart',
  name: 'cart',
  component: Cart
}, {
  path: '/profile',
  name: 'profile',
  component: Profile
}];

const router = new VueRoter({
  routes,
  mode: 'history'
});

export default router;