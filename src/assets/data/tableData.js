export const tableList = {
  needList: {
    tableTitle: ['编号', '需求标题', '类型', '数量', '日期', '提交专员编号', '详情', '状态', '操作'],
    tableBody: ['needid', 'needtitle', 'itemtype', 'neednum', 'needday', 'neederid', 'comment', 'opetation2', 'opetation1']
  },
  buyList: {
    tableTitle: ['编号', '订单标题', '日期', '类型', '类型ID', '数量', '购买编号', '提交者编号', '状态', '操作'],
    tableBody: ['buyid', 'buytitle', 'btime', 'itemtype', 'itemid', 'num', 'buyerid', 'neederid', 'opetation2', 'opetation1']
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
    tableTitle: ['序号', '用户名', '登陆账号', '电话号码', '职工号', '职位', '状态', '操作', '角色'],
    tableBody: ['index', 'realname', 'username', 'telNum', 'employeeid', 'roleId', 'roleStatus', 'opetation', 'opetationRole']
  },
  userListsee: {
    tableTitle: ['序号', '登陆账号', '用户名', '电话号码', '职工号', '职位'],
    tableBody: ['index', 'username', 'realname', 'telNum', 'employeeid', 'roleId']
  }
}
