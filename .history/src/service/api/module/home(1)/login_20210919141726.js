export default [
  {
    name: 'login',
    method: 'GET',
    desc: '用户登陆接口',
    path: '/web/shirologin',
    params: {
      username: '', // 李三
      password: '' // 123456  这是目前能用的
    }
  },
  {
    name: 'rigister',
    method: 'POST',
    desc: '用户注册请求',
    path: '/web/logon',
    data: {
      userid: '', // 这应该没什么用，我是自增的
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
