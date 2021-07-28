import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 1.state主要用于存储数据
  state: {
    count: 1,
    flagwel: 'block'
  },
  // 2.mutations里面放的是方法,方法主要用于改变state里面的数据
  mutations: {
    incCount () {
      ++state.count
    },
    blockwel () {
      state.flagwel = 'block'
    },
    nonewel () {
      state.flagwel = 'none'
    }
  },
  actions: {
  },
  modules: {
  }
})
