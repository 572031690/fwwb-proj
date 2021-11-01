import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_PERMISSION_NAME = 'SET_PERMISSION_NAME'

const store = new Vuex.Store({
  // 1.state主要用于存储数据
  state: {
    permissionName: ''
  },
  // 2.mutations里面放的是方法,方法主要用于改变state里面的数据
  mutations: {
    [SET_PERMISSION_NAME] (state, data) {
      state.permissionName = data
    }
  },
  getters: {
    getPermission (state) {
      return state.permissionName
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
