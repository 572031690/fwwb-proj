import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
// 引入echarts
import * as echarts from "echarts";

import axios from "axios"; // http://192.168.2.2 // 引入axios
import "./assets/CSS/basic.css";
import "./plugins/element.js";
Vue.prototype.$echarts = echarts;
// 引入axios全局网络接口封装
axios.defaults.baseURL = "http://localhost:8081/controller_war";
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios; // 作为vue对象的属性，并起个名字 ，后面要调用就直接this.$ajax

Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    console.log("1111111111111");
    // 聚焦元素
    el.focus();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
