export const tableList = {
  needList: {
    tableTitle: ['编号', '需求单名', '类型', '类型ID', '数量', '日期', '需求部门编号', '详情', '操作', '状态'],
    tableBody: ['needid', 'needtitle', 'itemtype', 'itemid', 'neednum', 'needday', 'neederid', 'comment', 'opetation1', 'opetation2']
  },
  buyList: {
    tableTitle: ['编号', '购买单名', '日期', '类型', '类型ID', '数量', '购买编号', '提交者编号', '操作'],
    tableBody: ['buyid', 'buytitle', 'btime', 'itemtype', 'itemid', 'num', 'buyerid', 'neederid', 'opetation']
  },
  departmentList: {
    tableTitle: ['部门名称', '部门编号', '操作'],
    tableBody: ['departmentname', 'departmentid', 'opetation']
  },
  itemList: {
    tableTitle: ['类型ID', '类型', '描述', '数量', '单位', '操作'],
    tableBody: ['itemid', 'itemtype', 'comment', 'neednum', 'unit', 'opetation']
  },
  userList: {
    tableTitle: ['编号', '用户名', '密码', '电话号码', '职工号', '部门号', '操作'],
    tableBody: ['userid', 'username', 'password', 'telNum', 'employeeid', 'departmentid', 'opetation']
  }
}
