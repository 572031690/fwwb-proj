import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
// 1.创建组件
import Home from '../view/Home.vue'
import HomeWel from '../view/home/HomeWel.vue'
import User from '../view/home/User.vue'
import Body from '../view/home/Body.vue'
import Item from '../view/home/Item.vue'
import Buy from '../view/home/Buy.vue'
import Login from '../view/Login.vue'
import Department from '../view/home/Department.vue'
import Driver from '../view/home/Driver.vue'
import Persion from '../view/home/personal.vue'
import ControlStock from '../view/home/ControlStock.vue'
import Role from '../view/home/Role.vue'
import Warehouse from '../view/home/Warehouse.vue'

Vue.use(VueRouter)
// 2.配置路由
const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'user',
        component: User,
        meta: { title: '用户信息', isTab: true }
      },
      { path: 'body', component: Body },
      { path: 'personal', component: Persion },
      { path: 'item', component: Item },
      { path: 'buy', component: Buy },
      { path: 'homewel', component: HomeWel },
      { path: 'department', component: Department },
      { path: 'driver', component: Driver },
      { path: 'contrstock', component: ControlStock },
      { path: 'role', component: Role },
      { path: 'warehouse', component: Warehouse },
      { path: '', redirect: '/home/homewel' }
    ]
  },
  { path: '/login', component: Login, name: 'login' },
  { path: '', redirect: '/login' } // 默认跳转路由
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // 路由守卫，类似java服务器端编写过滤器
  const store = window.sessionStorage.getItem('storeData') // 获取浏览器缓存值
  if (to.path === '/login' && !store) {
    return next()
  } else if (to.path === '/login' && store) {
    Message({
      type: 'error',
      showClose: true,
      message: '请先退出登陆'
    })
    return next('/home/homewel?routerIndex=1')
  } else if (!store) {
    next('/login')
    // return next()
  } else {
    return next()
  }
})

export default router
