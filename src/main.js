import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 全局引入vant
import vant from 'vant';
import "vant/lib/index.css";
// 全局引入懒加载
// import { Lazyload } from 'vant';

// 全局引入样式
import "./assets/css/base.css";

// Vue.use(Lazyload, {
//   loading: requestAnimationFrame()
// })

Vue.config.productionTip = false

// 注入插件
Vue.use(vant);

// 配置事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
