import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import view from './modules/view'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    view1: '123',
    test: '12333',
    lang: 'zh'
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    view
  },
  getters
})
