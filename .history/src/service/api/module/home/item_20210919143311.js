export default [
  {
    name: 'additem',
    method: 'POST',
    desc: '增加材料数据',
    path: '/webneed/addNeed',
    data: {
      itemid: '', // 因为材料的编号是一串字符 ##还没改
      itemtype: '',
      neednum: '',
      comment: '',
      unit: ''
    }
  },
  {
    name: 'deleteItem',
    method: 'GET',
    desc: '删除材料',
    path: '/webneed/deleteNeed',
    params: {
      itemid: ''
    }
  },
  {
    name: 'editItem',
    method: 'POST',
    desc: '修改材料数据',
    path: '/webneed/updateNeed',
    data: {
      itemid: '',
      itemtype: '',
      neednum: '',
      comment: '',
      unit: ''
    }
  },
  {
    name: 'getItem',
    method: 'GET',
    desc: '材料请求数据',
    path: '/webneed/findAllNeed',
    params: {
      page: '', // 传递当前是第几页参数
      limit: '', // 传递每页显示多少条记录参数
      username: '' // 传递搜索参数
    }
  }
]
