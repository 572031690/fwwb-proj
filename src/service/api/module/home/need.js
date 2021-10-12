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
      unit: '',
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
      unit: '',
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
      selectName: '' // 查询审批状态
    }
  },
  {
    name: 'approvalNeed',
    method: 'GET',
    desc: '需求表启动审批',
    path: '/activiti/startNeedAct',
    params: {
      needid: ''
    }
  },
  {
    name: 'completeprocess',
    method: 'GET',
    desc: '需求表提交审批/完成审批',
    path: '/activiti/completeprocess',
    params: {
      taskId: '', // int
      text: ''// String
    }
  },
  {
    name: 'startNeedActAgain',
    method: 'GET',
    desc: '重启审批流程',
    path: '/activiti/startNeedActAgain',
    params: {
      needid: '' // int
    }
  },
  {
    name: 'queryNeedActTask',
    method: 'GET',
    desc: '找出需求个人待办任务',
    path: '/activiti/queryNeedActTask',
    params: {
      page: '', // 传递当前是第几页参数
      limit: '', // 传递每页显示多少条记录参数
      searchName: '', // 传递搜索参数
      selectName: '' // 查询审批状态
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
    name: 'findHistoty',
    method: 'GET',
    desc: '查看需求历史审批',
    path: '/activiti/findHistoty',
    params: {
      needid: ''// int
    }
  }
]
