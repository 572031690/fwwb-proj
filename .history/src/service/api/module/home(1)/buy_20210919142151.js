export default [
  {
    name: 'addBuy',
    method: 'POST',
    desc: '增加购买订单数据',
    path: '/webbuy/addBuy',
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
    path: 'webbuy/deleteBuy',
    params: {
      buyid: ''
    }
  },
  {
    name: 'editBuy',
    method: 'POST',
    desc: '修改购买订单数据',
    path: '/webbuy/updateBuy',
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
    path: '/webbuy/findAllBuy',
    params: {
      page: '', // 传递当前是第几页参数
      limit: '', // 传递每页显示多少条记录参数
      buytitle: '', // 传递搜索参数
	  uptype: ''// 查看需求审批状态
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
