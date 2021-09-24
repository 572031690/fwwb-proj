export const tableList = {
  needList: {
    tableTitle: ['编号', '需求单名', '类型', '数量', '日期', '提交专员编号', '详情', '操作', '状态'],
    tableBody: ['needid', 'needtitle', 'itemtype', 'neednum', 'needday', 'neederid', 'comment', 'opetation1', 'opetation2']
  },
  buyList: {
    tableTitle: ['编号', '购买单名', '日期', '类型', '类型ID', '数量', '购买编号', '提交者编号', '操作'],
    tableBody: ['buyid', 'buytitle', 'btime', 'itemtype', 'itemid', 'num', 'buyerid', 'neederid', 'opetation']
  },
  departmentList: {
    tableTitle: ['部门名称', '部门编号', '操作'],
    tableBody: ['departmentname', 'departmentid', 'opetation']
  },
  itemListsee: {
    tableTitle: ['类型ID', '类型', '描述', '库存', '单位'],
    tableBody: ['itemid', 'itemtype', 'comment', 'stock', 'unit']
  },
  itemListedit: {
    tableTitle: ['类型ID', '类型', '描述', '库存', '单位', '操作'],
    tableBody: ['itemid', 'itemtype', 'comment', 'stock', 'unit', 'opetation']
  },
  userListedit: {
    tableTitle: ['编号', '用户名', '状态', '电话号码', '职工号', '职位', '操作', '角色'],
    tableBody: ['userid', 'username', 'roleStatus', 'telNum', 'employeeid', 'departmentid', 'opetation', 'opetationRole']
  },
  userListsee: {
    tableTitle: ['编号', '用户名', '电话号码', '职工号', '职位'],
    tableBody: ['userid', 'username', 'telNum', 'employeeid', 'departmentid']
  }
}
