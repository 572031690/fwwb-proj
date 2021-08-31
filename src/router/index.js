import Vue from "vue";
import VueRouter from "vue-router";
// 1.创建组件
import Home from "../view/Home.vue";
import HomeWel from "../view/home/HomeWel.vue";
import Adddata from "../components/Adddata.vue";
import User from "../view/home/User.vue";
import Body from "../view/home/Body.vue";
import Item from "../view/home/Item.vue";
import Buy from "../view/home/Buy.vue";
import Test from "../components/Test.vue";
import Login from "../view/Login.vue";
import login from "../components/login.vue";
import Department from "../view/home/Department.vue";
import addDataDialog from "../components/addDataDialog.vue";
Vue.use(VueRouter);
// 2.配置路由
const routes = [
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "user",
        component: User,
        meta: { title: "用户信息", isTab: true }
      },
      { path: "body", component: Body },
      { path: "item", component: Item },
      { path: "buy", component: Buy },
      { path: "login", component: login },
      { path: "homewel", component: HomeWel },
      { path: "department", component: Department },
      { path: "add", component: Adddata },
      { path: "", redirect: "/home/homewel" }
    ]
  },
  { path: "/login", component: Login, name: "login" },
  { path: "/test", component: Test, name: "test" },
  { path: "/addDataDialog", component: addDataDialog, name: "addDataDialog" }
  // {path:'/department',component:Department,name:'department'} //js跳转
  // {path:'/content/:aid',component:Content}, //动态路由
  // {path:'/pcontent',component:Pcontent}, //get方法传值配置
  // {path:'*',redirect:'/home'}  //默认跳转路由
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  // 路由守卫，类似java服务器端编写过滤器
  // if (to.path === '/login') return next() // 正常放行
  const store = window.sessionStorage.getItem("storeData"); // 获取浏览器缓存值
  // if (!store) return next('/login') // 判断如果里面的值为空则跳回登陆界面
  // next() // 正常放行
  if (to.path === "/login") {
    console.log("1");
    next();
  } else if (!store) {
    console.log("2");
    next('/login')
    // next();
  } else {
    console.log("3");
    next();
  }
});

export default router;
