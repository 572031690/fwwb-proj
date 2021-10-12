export const tableList = {
  needList: {
    tableTitle: ['编号', '需求标题', '物料名称', '数量', '创建日期', '提交专员编号', '详情', '状态', '操作'],
    tableBody: ['needid', 'needtitle', 'itemtype', 'neednum', 'needday', 'neederid', 'comment', 'opetation2', 'opetation1']
  },
  buyList: {
    tableTitle: ['编号', '订单标题', '创建日期', '物料名称', '物料编号', '数量', '提交专员编号', '订单码', '状态', '操作'],
    tableBody: ['buyid', 'buytitle', 'btime', 'itemtype', 'itemid', 'num', 'buyerid', 'auditid', 'opetation2', 'opetation1']
  },
  departmentList: {
    tableTitle: ['部门名称', '部门编号', '操作'],
    tableBody: ['departmentname', 'departmentid', 'opetation']
  },
  itemListsee: {
    tableTitle: ['类型编号', '材料名称', '描述', '库存', '单位'],
    tableBody: ['itemid', 'itemtype', 'comment', 'stock', 'unit']
  },
  itemListedit: {
    tableTitle: ['类型编号', '材料名称', '描述', '库存', '单位', '操作'],
    tableBody: ['itemid', 'itemtype', 'comment', 'stock', 'unit', 'opetation']
  },
  userListedit: {
    tableTitle: ['序号', '用户姓名', '登陆账号', '电话号码', '职工号', '职位', '状态', '操作', '角色'],
    tableBody: ['index', 'realname', 'username', 'telNum', 'employeeid', 'roleId', 'roleStatus', 'opetation', 'opetationRole']
  },
  userListsee: {
    tableTitle: ['序号', '用户姓名', '登陆账号', '电话号码', '职工号', '职位'],
    tableBody: ['index', 'realname', 'username', 'telNum', 'employeeid', 'roleId']
  }
}
