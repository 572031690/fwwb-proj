// import { reject, resolve } from 'any-promise'
import axios from 'axios'
// import { response } from 'express'
import qs from 'qs' // 引入qs模块，用来序列化post类型的数据，后面会提到
import APIUrl from './api.url'
import router from '../router' // 引入路由
import { Loading, Message } from 'element-ui'

// axios 默认配置  更多配置查看Axios中文文档
axios.defaults.timeout = 5000 // 超时默认值
axios.defaults.baseURL = APIUrl.baseURL // 默认baseURL
// axios.defaults.transformRequest = [
//   function (data) {
//     return qs.stringify(data, {
//       arrayFormat: 'brackets'
//     })
//   }
// ]

// axios.defaults.responseType  = 'json'         // 默认数据响应类型
// 请求的时候，我们需要加上一个请求头，所以可以在这里进行一个默认的设置
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true // 表示跨域请求时是否需要使用凭证
axios.defaults.headers.post['Content-Type'] = 'application/json'

// http request 拦截器 全局请求拦截
// 在ajax发送之前拦截 比如对所有请求统一添加header token
axios.interceptors.request.use(
  config => {
    const token = window.sessionStorage.getItem('token-access') // 拿到浏览器的token
    console.log(config, 'config')
    // if (token) {
    config.headers.Authorization = `token ${token}` // 创建并赋值请求头字段
    // config.headers.token = '123456' // 和服务器约定好token叫什么名字  token Authorization
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器  全局相应拦截
// ajax请求回调之前拦截 对请求返回的信息做统一处理 比如error为401无权限则跳转到登陆界面
axios.interceptors.response.use(
  response => {
    console.log(response, 'responseresponse大苏打')
    switch (response.data.error) {
      case 404:

        response.data.msg = '未授权，请登录'
        Message({
          type: 'error',
          showClose: true,
          message: '端口404 未找到网页'
        })
        break
      default:
        break
    }
    return response
  },
  error => {
    console.log('错误信息：' + error)
    return Promise.reject(error)
  }
)

export default axios // 这句千万不能漏下！！！

/**
 * post 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (url, data = {}, headers) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, headers).then(
      response => {
        resolve(response.data)
      },
      () => {
        Message({
          type: 'error',
          showClose: true,
          message: '网络异常'
        })
        // reject(new Error('网络异常'))
      }
    )
  })
}

/**
 * get 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, data = {}, headers) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: data }, headers).then(
      response => {
        resolve(response.data)
      },
      () => {
        Message({
          type: 'error',
          showClose: true,
          message: '网络异常'
        })
        // reject(new Error('网络异常'))
      }
    )
  })
}

/**
 * 其他delete等的封装类似
 * 可以查看中文文档 自行封装
 */
