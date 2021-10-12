export const addEditList = {
  needList: {
    dataTableList: [
      {
        label: '需求编号',
        putType: 'disput',
        dataName: 'needid',
        placeholder: ''
      },
      {
        label: '需求标题',
        putType: 'input',
        dataName: 'needtitle',
        placeholder: '例如:钢材购买需求申请'
      },
      {
        label: '类型',
        putType: 'selectItem',
        selectData: ['钢铁', '熟料', '橡胶', '泡沫'],
        dataName: 'itemtype'
      },
      { label: '数量', putType: 'num', dataName: 'neednum' },
      { label: '申请人编号', putType: 'disput', dataName: 'neederid' },
      { label: '详情', putType: 'textarea', dataName: 'comment', placeholder: '例如:此申请用于XXX公司的订单交易' }
    ],
    formList: {
      needid: '',
      needtitle: '',
      itemtype: '',
      itemid: '',
      neednum: '',
      needday: '',
      unit: '',
      neederid: '',
      comment: '',
      uptype: ''
    },
    url: {
      add: 'home/need/addNeed',
      edit: 'home/need/editNeed',
      approval: 'home/need/editNeed',
      startApproval: 'home/need/approvalNeed',
      upApproval: 'home/need/completeprocess'
    }
  },
  buyList: {
    dataTableList: [
      {
        label: '订单编号',
        putType: 'disput',
        dataName: 'buyid'
      },
      {
        label: '订单标题',
        putType: 'input',
        dataName: 'buytitle',
        placeholder: '例如:钢材购买申请'
      },
      {
        label: '类型',
        putType: 'selectItem',
        selectData: ['10000', '996', '007', '123'],
        dataName: 'itemtype'
      },
      {
        label: '数量',
        putType: 'num',
        dataName: 'num'
      },
      {
        label: '购买专员编号',
        putType: 'disput',
        dataName: 'buyerid'

      },
      {
        label: '需求专员编号',
        putType: 'numput',
        dataName: 'neederid',
        placeholder: '例如:15,2,25'
      },
      {
        label: '订单码',
        putType: 'numput',
        dataName: 'auditid',
        placeholder: '例如:165042101'
      },
      {
        label: '详情',
        putType: 'textarea',
        dataName: 'comment',
        placeholder: '例如:此申请用于XXX公司的订单交易'
      }
    ],
    formList: {
      buyid: '',
      buytitle: '',
      btime: '',
      itemtype: '',
      itemid: '',
      num: '',
      auditid: '',
      buyerid: '',
      neederid: '',
      comment: '',
      uptype: ''
    },
    url: {
      add: 'home/buy/addBuy',
      edit: 'home/buy/updateBuy',
      approval: 'home/buy/updateBuy',
      startApproval: 'home/buy/startBuyAct',
      upApproval: 'home/buy/completeprocess'
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
      },
      {
        label: '部门描述',
        putType: 'textarea',
        dataName: 'detail'
      }
    ],
    formList: {
      departmentname: '',
      departmentid: '',
      detail: ''
    },
    url: {
      add: 'home/department/addDepart',
      edit: 'home/department/editDepart'
    }
  },
  itemList: {
    dataTableList: [
      {
        label: '类型编号',
        putType: 'input',
        dataName: 'itemid',
        placeholder: '例如:JS001，XP201，JP015'
      },
      {
        label: '种类',
        putType: 'input',
        dataName: 'itemtype',
        placeholder: '例如:钢材，木材，橡胶'
      },
      {
        label: '库存',
        putType: 'num',
        dataName: 'stock'
      },
      {
        label: '单位',
        putType: 'input',
        dataName: 'unit',
        placeholder: '例如:kg,t,片'
      },
      {
        label: '详情',
        putType: 'textarea',
        dataName: 'comment',
        placeholder: '例如:此XXX材料是最新型号合成材料，有很强的硬度'
      }
    ],
    formList: {
      itemid: '',
      itemtype: '',
      stock: '',
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
        label: '系统编号',
        putType: 'disput',
        dataName: 'userid',
        placeholder: ''
      },
      {
        label: '登陆账号',
        putType: 'input',
        dataName: 'username',
        placeholder: '例如: 543214'
      },
      {
        label: '真实姓名',
        putType: 'input',
        dataName: 'realname',
        placeholder: '张三'
      },
      {
        label: '电话',
        putType: 'numput',
        dataName: 'telNum',
        placeholder: '例如: 185424215411'
      },
      {
        label: '员工号',
        putType: 'numput',
        dataName: 'employeeid',
        placeholder: '例如: 12531'
      }
    ],
    formList: {
      userid: '',
      username: '',
      realname: '',
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
