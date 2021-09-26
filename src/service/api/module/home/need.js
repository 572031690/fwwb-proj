export default [
  {
    name: 'addNeed',
    method: 'POST',
    desc: '增加需求数据',
    path: '/webneed/addNeed',
    data: {
      needtitle: '',
      itemtype: '',
      itemid: '',
      neednum: '',
      needday: '',
      neederid: '',
      comment: ''
    }
  },
  {
    name: 'deleteNeed',
    method: 'GET',
    desc: '删除需求数据',
    path: '/webneed/deleteNeed',
    params: {
      needid: ''
    }
  },
  {
    name: 'editNeed',
    method: 'POST',
    desc: '修改需求数据',
    path: '/webneed/updateNeed',
    data: {
      needid: '',
      needtitle: '',
      itemtype: '',
      itemid: '',
      neednum: '',
      needday: '',
      neederid: '',
      comment: ''
    }
  },
  {
    name: 'getNeed',
    method: 'GET',
    desc: '获取需求表',
    path: '/webneed/findAllNeed',
    params: {
      page: '', // 传递当前是第几页参数
      limit: '', // 传递每页显示多少条记录参数
      searchName: '', // 传递搜索参数
      uptype: '' // 查询审批状态
    }
  },
  {
    name: 'approvalNeed',
    method: 'POST',
    desc: '需求表提交审批',
    path: '/web/listUser',
    data: {
      needid: '',
      uptype: 0
    }
  }
]
