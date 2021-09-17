export default [
  {
    name: 'AddUser',
    method: 'POST',
    desc: '用户增加数据',
    path: '/web/saveUser',
    params: {
      username: '',
      password: '',
      telNum: '',
      departmentid: '',
      employeeid: ''
    }
  },
  {
    name: 'deleteUser',
    method: 'GET',
    desc: '用户删除数据',
    path: '/web/saveUser',
    data: {
      userid: ''
    }
  }
]
