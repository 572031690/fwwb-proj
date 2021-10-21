import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 1.state主要用于存储数据
  state: {
    count: 1,
    flagwel: 'block',
    dialogDraw: false, // 显示抽屉
    departmentId: '',
    routerIndex: 1,
    permission: '',
    permissionId: ''
  },
  // 2.mutations里面放的是方法,方法主要用于改变state里面的数据
  mutations: {

    ChangeDraw (state) {
      state.dialogDraw = !state.dialogDraw
    },
    getDepartment (state, id) {
      state.departmentId = id
    },
    setRouter (state, id) {
      state.routerIndex = id
    },
    setPermission (state, data) {
      state.permission = data
    },
    setPermissionId (state, data) {
      state.permissionId = data
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
