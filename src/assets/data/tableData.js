export const addEditList = {
  needList:{
    dialogType: '',
    dataTableList: [
      {
        label: '需求单名',
        putType: 'input',
        dataName: 'needtitle'
      },
      {
        label: '类型',
        putType: 'select',
        selectData: ['10000', '996', '007', '123'],
        dataName: 'itemtype'
      },
      {
        label: '类型ID',
        putType: 'select',
        selectData: ['10000', '996', '007', '123'],
        dataName: 'itemid'
      },
      { label: '数量', putType: 'num', dataName: 'neednum' },
      { label: '需求日期', putType: 'date', dataName: 'needday' },
      { label: '负责人部门号', putType: 'disput', dataName: 'neederid' },
      { label: '详情', putType: 'textarea', dataName: 'comment' }
    ],
    formList: {
      needid: '',
      needtitle: '',
      itemtype: '',
      itemid: '',
      neednum: '',
      needday: '',
      neederid: '',
      comment: '',
      uptype: 0
    },
    url: ''
  },
  buyList:{
    dialogType: '',
    dataTableList: [
      {
        label: '购买单名',
        putType: 'input',
        dataName: 'buytitle'
      },
      {
        label: '日期',
        putType: 'date',
        dataName: 'btime'
      },
      {
        label: '类型',
        putType: 'select',
        selectData: ['10000', '996', '007', '123'],
        dataName: 'itemtype'
      },
      {
        label: '类型ID',
        putType: 'select',
        selectData: ['10000', '996', '007', '123'],
        dataName: 'itemid'
      },
      {
        label: '数量',
        putType: 'num',
        dataName: 'num'
      },
      {
        label: '购买编号',
        putType: 'numput',
        dataName: 'buyerid'
      },
      {
        label: '负责人编号',
        putType: 'disput',
        dataName: 'neederid'
      }
    ],
    formList: {
      buyid: '',
      buytitle: '',
      btime: '',
      itemtype: '',
      itemid: '',
      num: '',
      buyerid: '',
      neederid: 15
    },
    url: ''
  }

}

export const tableList = {
  needList: {
    tableTitle: ['编号', '需求单名', '类型', '类型ID', '数量', '日期', '需求部门编号', '详情', '操作', '状态'],
    tableBody: ['needid', 'needtitle', 'itemtype', 'itemid', 'neednum', 'needday', 'neederid', 'comment', 'opetation1', 'opetation2']
  },
  buyList:  {
    tableTitle: ['编号', '购买单名', '日期', '类型', '类型ID', '数量', '购买编号', '提交者编号', '操作'],
    tableBody: ['buyid', 'buytitle', 'btime', 'itemtype', 'itemid', 'num', 'buyerid', 'neederid', 'opetation']
  },
  departmentList: {
    tableTitle: ['部门名称', '部门编号', '操作'],
    tableBody: ['departmentname', 'departmentid', 'opetation']
  },
  itemList: {
    tableTitle:['需求单名','类型ID','类型','描述','数量','操作'],
    tableBody:['needtitle','itemid','itemtype','comment','neednum','opetation']
  },
  userList: {
    tableTitle: ['编号', '用户名', '密码', '电话号码', '职工号', '部门号', '操作'],
    tableBody: ['userid', 'username', 'password', 'telNum', 'employeeid', 'departmentid', 'opetation']
  }
}
