export default [
  {
    name: 'listRole',
    method: 'GET',
    desc: '获取角色表中所有信息',
    path: '/Role/listRole',
    params: {
      page: '', // 传递当前是第几页参数
      limit: '', // 传递每页显示多少条记录参数
      searchName: '', // 传递搜索参数
      selectName: ''
    }
  },
  {
    name: 'listPerm',
    method: 'GET',
    desc: '查看权限列表',
    path: '/Perm/listPerm',
    params: {
      page: '', // 传递当前是第几页参数
      limit: '', // 传递每页显示多少条记录参数
      searchName: '', // 传递搜索参数
      selectName: ''
    }
  }
]
