export default [
  {
    name: 'login',
    method: 'GET',
    desc: '用户登陆接口',
    path: '/web/login',
    params: {
      username: '',
      password: ''
    }
  },
  {
    name: 'rigister',
    method: 'POST',
    desc: '用户注册请求',
    path: '/web/login',
    data: {
      userid: '',
      username: '',
      password: '',
      telNum: '',
      employeeid: '',
      departmentid: ''
    }
  },
  {
    name: 'getCode',
    method: 'POST',
    desc: '发生注册手机验证码',
    path: '/getCode',
    params: {
      phone: ''
    }
  }
]
