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
      neederid: '',
      unit: '',
      auditid: '',
      comment: ''
    }
  },
  {
    name: 'deleteBuy',
    method: 'GET',
    desc: '删除购买订单数据',
    path: '/webbuy/deleteBuy',
    params: {
      buyid: ''
    }
  },
  {
    name: 'updateBuy',
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
      unit: '',
      buyerid: '',
      neederid: '',
      auditid: '',
      comment: ''
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
      searchName: '', // 传递搜索参数
      selectName: '', // 查看需求审批状态 ##没加
      roleId: ''
    }
  },
  {
    name: 'approvalBuy',
    method: 'POST',
    desc: '提交购买订单送审批',
    path: '/web/listUser',
    data: {
      buyid: '',
      uptype: ''
    }
  },
  {
    name: 'findHistotyBuy',
    method: 'GET',
    desc: '查看购买历史审批',
    path: '/activiti/findHistotyBuy',
    params: {
      buyid: ''// int
    }
  },
  {
    name: 'startBuyAct',
    method: 'GET',
    desc: '启动采购流程',
    path: '/activiti/startBuyAct',
    params: {
      buyid: ''// int
    }
  },
  {
    name: 'queryBuyActTask',
    method: 'GET',
    desc: '找出购买个人代办任务',
    path: '/activiti/queryBuyActTask',
    params: {
      page: '', // 传递当前是第几页参数
      limit: '', // 传递每页显示多少条记录参数
      searchName: '', // 传递搜索参数
      selectName: '' // 查看需求审批状态 ##没加
    }
  },
  {
    name: 'completeprocess',
    method: 'GET',
    desc: '完成审批节点/ 提交审批',
    path: '/activiti/completeprocess',
    params: {
      taskId: '', // int
      text: ''// String
    }
  },
  {
    name: 'deleteprocess',
    method: 'GET',
    desc: '驳回审批节点',
    path: '/activiti/deleteprocess',
    params: {
      taskId: '', // int
      text: ''// String
    }
  },
  {
    name: 'startBuyActAgain',
    method: 'GET',
    desc: '重启采购流程',
    path: ' /activiti/startBuyActAgain',
    params: {
      buyid: '' // int
    }
  }
]
