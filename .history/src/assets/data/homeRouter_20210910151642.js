export const routerList = [
  {
    type: 'router',
    index: 1,
    path: '/home/homewel',
    label: '首页',
    ref: 'spans1',
    disabled: false,
    imgSrc: require('@/assets/img/homeimg.png'),
    showtab: true,
    childrenList: []
  },
  {
    type: 'tips',
    index: 2,
    path: '',
    label: '列表详情',
    ref: 'spans2',
    disabled: true,
    imgSrc: require('@/assets/img/item.png'),
    imgtips: require('@/assets/img/小箭头.png'),
    showtab: true,
    childrenList: [
      {
        index: 21,
        path: '/home/body',
        label: '需求表',
        ref: 'spans7',
        disabled: false,
        imgSrc: require('@/assets/img/body.png')
      },
      {
        index: 23,
        path: '/home/buy',
        label: '购买订单',
        ref: 'spans5',
        disabled: false,
        showtab: true,
        imgSrc: require('@/assets/img/buy.png')
      },
      {
        index: 22,
        path: '/home/item',
        label: '材料',
        ref: 'spans6',
        disabled: false,
        showtab: true,
        imgSrc: require('@/assets/img/material.png')
      }
    ]
  },
  {
    type: 'router',
    index: 3,
    path: '/home/department',
    label: '部门管理',
    ref: 'spans3',
    disabled: false,
    imgSrc: require('@/assets/img/department.png'),
    showtab: true,
    childrenList: []
  },
  {
    type: 'router',
    index: 4,
    path: '/home/user',
    label: '用户信息',
    ref: 'spans8',
    disabled: false,
    imgSrc: require('@/assets/img/user.png'),
    showtab: true,
    childrenList: []
  }
]
