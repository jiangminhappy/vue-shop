import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  // 是否在数据请求页面时加载数据
  // isLoading: true
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
