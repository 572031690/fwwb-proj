export default [
  {
    name: 'AddUser',
    method: 'POST',
    desc: '用户增加数据',
    path: '/web/saveUser',
    data: {
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
    params: {
      userid: ''
    }
  },
  {
    name: 'editUser',
    method: 'POST',
    desc: '用户修改数据',
    path: '/web/updateUser',
    data: {
      userid: '',
      username: '',
      password: '',
      telNum: '',
      departmentid: '',
      employeeid: ''
    }
  }
]
