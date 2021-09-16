export const addEditList = {
  needList: {
    dataTableList: [
      {
        label: '编号ID',
        putType: 'disput',
        dataName: 'needid'
      },
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
    url: {
      add: 'home/need/addNeed',
      edit: 'home/need/editNeed',
      approval: 'home/need/approvalNeed'
    }
  },
  buyList: {
    dataTableList: [
      {
        label: '编号ID',
        putType: 'disput',
        dataName: 'buyid'
      },
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
    url: {
      add: 'home/buy/addBuy',
      edit: 'home/buy/updateBuy',
      approval: 'home/buy/approvalBuy'
    }
  },
  department: {
    dataTableList: [
      {
        label: '部门名称',
        putType: 'input',
        dataName: 'departmentname'
      },
      {
        label: '部门编号',
        putType: 'numput',
        dataName: 'departmentid'
      }
    ],
    formList: {
      departmentname: '',
      departmentid: ''
    },
    url: {
      add: 'home/department/addDepart',
      edit: 'home/department/editDepart'
    }
  },
  itemList: {
    dataTableList: [
      {
        label: '类型ID',
        putType: 'disput',
        dataName: 'itemid'
      },
      {
        label: '类型',
        putType: 'select',
        selectData: ['10000', '996', '007', '123'],
        dataName: 'itemtype'
      },
      {
        label: '数量',
        putType: 'num',
        dataName: 'neednum'
      },
      {
        label: '单位',
        putType: 'select',
        selectData: ['KG', 'T', 'g'],
        dataName: 'unit'
      },
      {
        label: '详情',
        putType: 'textarea',
        dataName: 'comment'
      }
    ],
    formList: {
      itemid: '',
      itemtype: '',
      neednum: '',
      comment: '',
      unit: ''
    },
    url: {
      add: 'home/item/additem',
      edit: 'home/item/editItem',
      approval: ''
    }
  },
  userList: {
    dataTableList: [
      {
        label: '编号',
        putType: 'disput',
        dataName: 'userid'
      },
      {
        label: '姓名',
        putType: 'input',
        dataName: 'username'
      },
      {
        label: '密码',
        putType: 'input',
        dataName: 'password'
      },
      {
        label: '电话',
        putType: 'numput',
        dataName: 'telNum'
      },
      {
        label: '部门编号',
        putType: 'select',
        selectData: ['10000', '10001', '10010', '10020'],
        dataName: 'departmentid'
      },
      {
        label: '员工号',
        putType: 'numput',
        dataName: 'employeeid'
      }
    ],
    formList: {
      userid: '',
      username: '',
      password: '',
      telNum: '',
      departmentid: '',
      employeeid: ''
    },
    url: {
      add: 'home/user/AddUser',
      edit: 'home/user/editUser',
      approval: ''
    }
  }
}
