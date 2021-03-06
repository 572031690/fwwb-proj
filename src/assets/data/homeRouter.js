export const routerList = [
  {
    type: 'router',
    index: 1,
    permissionName: 0,
    path: '/home/homewel',
    label: '首页',
    ref: 'spans1',
    disabled: false,
    imgSrc: require('@/assets/img/homeimg.png'),
    showtab: true,
    childrenList: []
  },
  {
    type: 'router',
    index: 7,
    permissionName: 'echart:monthsale',
    path: '/home/driver',
    label: '数据驾驶舱',
    ref: 'spans9',
    disabled: false,
    imgSrc: require('@/assets/img/driver.png'),
    showtab: false,
    childrenList: []
  },
  {
    type: 'tips',
    index: 2,
    path: '',
    label: '申报管理',
    ref: 'spans2',
    arrowRef: 'tipsarrowsee',
    navSonShow: true,
    disabled: true,
    imgSrc: require('@/assets/img/item.png'),
    imgtips: require('@/assets/img/arrow.png'),
    showtab: false,
    childrenList: [
      {
        index: 21,
        permissionName: 'needer:addNeed',
        path: '/home/need',
        label: '需求申报',
        ref: 'spans7',
        disabled: false,
        showtab: false,
        imgSrc: require('@/assets/img/body.png')
      },
      {
        index: 22,
        permissionName: 'buyer:addBuy',
        path: '/home/buy',
        label: '采购申报',
        ref: 'spans5',
        disabled: false,
        showtab: false,
        imgSrc: require('@/assets/img/buy.png')
      }
      // {
      //   index: 23,
      //   path: '/home/item',
      //   label: '材料',
      //   ref: 'spans6',
      //   disabled: false,
      //   showtab: false,
      //   imgSrc: require('@/assets/img/material.png')
      // }
    ]
  },
  {
    type: 'tips',
    index: 3,
    path: '',
    label: '审批管理',
    ref: 'spans10',
    disabled: true,
    arrowRef: 'tipsarrowappro',
    navSonShow: true,
    imgSrc: require('@/assets/img/approal.png'),
    imgtips: require('@/assets/img/arrow.png'),
    showtab: false,
    childrenList: [
      {
        index: 31,
        permissionName: 'needManager:findHistory',
        path: '/home/need',
        label: '审批需求',
        ref: 'spans11',
        disabled: false,
        showtab: false,
        imgSrc: require('@/assets/img/body.png')
      },
      {
        index: 32,
        permissionName: 'buyManager:findHistory',
        path: '/home/buy',
        label: '审批订单',
        ref: 'spans12',
        disabled: false,
        showtab: false,
        imgSrc: require('@/assets/img/buy.png')
      }
      // {
      //   index: 33,
      //   path: '/home/item',
      //   label: '物料',
      //   ref: 'spans13',
      //   disabled: false,
      //   showtab: false,
      //   imgSrc: require('@/assets/img/material.png')
      // }
    ]
  },
  {
    type: 'router',
    index: 4,
    permissionName: 100,
    path: '/home/department',
    label: '部门管理',
    ref: 'spans3',
    disabled: false,
    imgSrc: require('@/assets/img/department.png'),
    showtab: false,
    childrenList: []
  },
  {
    type: 'router',
    index: 5,
    permissionName: 'item:addItem',
    path: '/home/item',
    label: '基础数据',
    ref: 'spans14',
    disabled: false,
    imgSrc: require('@/assets/img/material.png'),
    showtab: false,
    childrenList: []
  },
  {
    type: 'router',
    index: 6,
    permissionName: 'admin:userlist',
    path: '/home/user',
    label: '用户信息',
    ref: 'spans8',
    disabled: false,
    imgSrc: require('@/assets/img/user.png'),
    showtab: false,
    childrenList: []
  },
  {
    type: 'router',
    index: 9,
    permissionName: 0,
    path: '/home/warehouse',
    label: '物料仓库',
    ref: 'spans16',
    disabled: false,
    imgSrc: require('@/assets/img/warehouse.png'),
    showtab: true,
    childrenList: []
  },
  {
    type: 'router',
    index: 13,
    permissionName: 'admin:listPerm',
    path: '/home/permission',
    label: '权限管理',
    ref: 'spans19',
    disabled: false,
    imgSrc: require('@/assets/img/permission.png'),
    showtab: true,
    childrenList: []
  },
  {
    type: 'router',
    index: 10,
    permissionName: 'admin:listRole',
    path: '/home/role',
    label: '角色管理',
    ref: 'spans17',
    disabled: false,
    imgSrc: require('@/assets/img/role.png'),
    showtab: true,
    childrenList: []
  },
  {
    type: 'router',
    index: 11,
    permissionName: 'storekeeper:findInRepositoryList',
    path: '/home/contrstock',
    label: '仓库管理',
    ref: 'spans18',
    disabled: false,
    imgSrc: require('@/assets/img/controlstock.png'),
    showtab: true,
    childrenList: []
  },
  {
    type: 'router',
    index: 8,
    permissionName: 0,
    path: '/home/personal',
    label: '个人中心',
    ref: 'spans15',
    disabled: false,
    imgSrc: require('@/assets/img/personal.png'),
    showtab: true,
    childrenList: []
  }
]
