import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
// 引入echarts
import * as echarts from 'echarts'

import { tableList } from './assets/data/tableData'
import sendAxios from './service/axios'
import axios from 'axios' // http://192.168.2.2 // 引入axios
import './assets/CSS/basic.css'
import './plugins/element.js'
import 'font-awesome/css/font-awesome.css'
Vue.prototype.$echarts = echarts

Vue.prototype.$tables = tableList
// 引入axios全局网络接口封装
// axios.defaults.baseURL = 'http://localhost:8081/controller_war'
Vue.config.productionTip = false // 阻止启动生产消息，常用作指令。
Vue.prototype.$ajax = axios // 作为vue对象的属性，并起个名字 ，后面要调用就直接this.$ajax
Vue.prototype.$api = sendAxios

// 自定义方法
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // el.style.color = "red";
    // 聚焦元素
    setTimeout(function () {
      el.focus()
    }, 500)
    // 聚焦元素 el-input
    // el.querySelector("input").focus();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
