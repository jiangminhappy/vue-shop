import Vue from 'vue';
import VueRoter from 'vue-router';

Vue.use(VueRoter);

import Home from  '../views/home/Home';
import Category from '../views/category/Category';
import Cart from '../views/cart/Cart';
import Profile from '../views/profile/Profile';
import Detail from '../views/detail/Detail';


const routes = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/category',
  name: 'category',
  component: Category
}, {
  path: '/cart',
  name: 'cart',
  component: Cart
}, {
  path: '/profile',
  name: 'profile',
  component: Profile
}, {
  path: '/detail/:iid',
  name: 'detail',
  component: Detail
}];

const router = new VueRoter({
  routes,
  mode: 'history'
});

export default router;