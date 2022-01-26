import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
// 1.创建组件
// import Home from '../view/Home.vue'
// import HomeWel from '../view/home/HomeWel.vue'
// import User from '../view/home/User.vue'
// import Need from '../view/home/need.vue'
// import Item from '../view/home/Item.vue'
// import Buy from '../view/home/Buy.vue'
// import Login from '../view/Login.vue'
// import Department from '../view/home/Department.vue'
// import Driver from '../view/home/Driver.vue'
// import Persion from '../view/home/personal.vue'
// import ControlStock from '../view/home/ControlStock.vue'
// import Role from '../view/home/Role.vue'
// import Warehouse from '../view/home/Warehouse.vue'
// import permission from '../view/home/permission.vue'

Vue.use(VueRouter)
// 2.配置路由
const routes = [
  {
    path: '/home',
    component: () => import('@/view/Home.vue'),
    children: [
      {
        path: 'user',
        // component: User,
        component: () => import('@/view/home/User.vue'),
        meta: { title: '用户信息', isTab: true }
      },
      {
        path: 'need',
        component: () => import('@/view/home/need.vue')
      },
      {
        path: 'permission',
        component: () => import('@/view/home/permission.vue')
      },
      {
        path: 'personal',
        component: () => import('@/view/home/personal.vue')
      },
      {
        path: 'item',
        component: () => import('@/view/home/Item.vue')
      },
      {
        path: 'buy',
        component: () => import('@/view/home/Buy.vue')
      },
      {
        path: 'homewel',
        component: () => import('@/view/home/HomeWel.vue')
      },
      {
        path: 'department',
        component: () => import('@/view/home/Department.vue')
      },
      {
        path: 'driver',
        component: () => import('@/view/home/Driver.vue')
      },
      {
        path: 'contrstock',
        component: () => import('@/view/home/ControlStock.vue')
      },
      {
        path: 'role',
        component: () => import('@/view/home/Role.vue')
      },
      {
        path: 'warehouse',
        component: () => import('@/view/home/Warehouse.vue')
      },
      {
        path: '',
        redirect: '/home/homewel'
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/view/Login.vue')
  },
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
    // next('/login')
    if (to.path !== '/') {
      Message({
        type: 'info',
        showClose: true,
        message: '请先登陆！'
      })
    }
    return next()
  } else {
    return next()
  }
})

export default router