export default [
  {
    name: 'addNeed',
    method: 'POST',
    desc: '增加需求数据',
    path: '/web/saveUser',
    data: {
      needtitle: '',
      itemtype: '',
      itemid: '',
      neednum: '',
      needday: '',
      neederid: '',
      comment: '',
      uptype: ''
    }
  },
  {
    name: 'deleteNeed',
    method: 'GET',
    desc: '删除需求数据',
    path: '/web/deleteUser',
    params: {
      needid: ''
    }
  },
  {
    name: 'editNeed',
    method: 'POST',
    desc: '修改需求数据',
    path: '/web/updateUser',
    data: {
      needid: '',
      needtitle: '',
      itemtype: '',
      itemid: '',
      neednum: '',
      needday: '',
      neederid: '',
      comment: '',
      uptype: 0
    }
  },
  {
    name: 'getNeed',
    method: 'GET',
    desc: '获取需求表',
    path: 'web/listUser',
    params: {
      page: '', // 传递当前是第几页参数
      limit: '', // 传递每页显示多少条记录参数
      username: '' // 传递搜索参数
    }
  },
  {
    name: 'approvalNeed',
    method: 'POST',
    desc: '需求表提交审批',
    path: 'web/listUser',
    data: {
      needid: '',
      needtitle: '',
      itemtype: '',
      itemid: '',
      neednum: '',
      needday: '',
      neederid: '',
      comment: '',
      uptype: 0
    }
  }
]
