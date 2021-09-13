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
    imgtips: require('@/assets/img/arrow.png'),
    showtab: true,
    childrenList: [
      {
        index: 21,
        path: '/home/body',
        label: '需求表',
        ref: 'spans7',
        disabled: false,
        showtab: true,
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
    type: 'tips',
    index: 6,
    path: '',
    label: 'OA审批',
    ref: 'spans10',
    disabled: true,
    imgSrc: require('@/assets/img/approal.png'),
    imgtips: require('@/assets/img/arrow.png'),
    showtab: true,
    childrenList: [
      {
        index: 61,
        path: '/home/body',
        label: '需求单',
        ref: 'spans11',
        disabled: false,
        showtab: true,
        imgSrc: require('@/assets/img/body.png')
      },
      {
        index: 62,
        path: '/home/buy',
        label: '购买订单',
        ref: 'spans12',
        disabled: false,
        showtab: true,
        imgSrc: require('@/assets/img/buy.png')
      },
      {
        index: 63,
        path: '/home/item',
        label: '材料',
        ref: 'spans13',
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
    showtab: false,
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
    showtab: false,
    childrenList: []
  },
  {
    type: 'router',
    index: 5,
    path: '/home/driver',
    label: '驾驶舱',
    ref: 'spans9',
    disabled: false,
    imgSrc: require('@/assets/img/driver.png'),
    showtab: false,
    childrenList: []
  }
]
