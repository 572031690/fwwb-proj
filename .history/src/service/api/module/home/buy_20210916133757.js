export default [
  {
    name: 'addBuy',
    method: 'POST',
    desc: '增加购买订单数据',
    path: '/web/saveUser',
    data: {
      buytitle: '',
      btime: '',
      itemtype: '',
      itemid: '',
      num: '',
      buyerid: '',
      neederid: ''
    }
  },
  {
    name: 'deleteBuy',
    method: 'GET',
    desc: '删除购买订单数据',
    path: '/web/deleteUser',
    params: {
      buyid: ''
    }
  },
  {
    name: 'editBuy',
    method: 'POST',
    desc: '修改购买订单数据',
    path: '/web/updateUser',
    data: {
      buyid: '',
      buytitle: '',
      btime: '',
      itemtype: '',
      itemid: '',
      num: '',
      buyerid: '',
      neederid: ''
    }
  },
  {
    name: 'getBuy',
    method: 'GET',
    desc: '获取购买订单数据列表',
    path: 'web/listUser',
    params: {
      page: '', // 传递当前是第几页参数
      limit: '', // 传递每页显示多少条记录参数
      username: '' // 传递搜索参数
    }
  },
  {
    name: 'approvalBuy',
    method: 'POST',
    desc: '提交购买订单送审批',
    path: 'web/listUser',
    data: {
      buyid: '',
      uptype: ''
    }
  }
]
