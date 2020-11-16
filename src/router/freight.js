export default [
  {
    path: '/freight',
    name: 'Freight',
    component: resolve => require(['@/views/carriage/JoinList'], resolve),
    meta: {
      title: '运费管理',
      keepAlive: true
    }
  },
  {
    path: '/joindetail',
    name: 'Joindetail',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/carriage/JoinDetail'], resolve),
    meta: {
      title: '运费详情',
      keepAlive: false
    }
  },
  {
    path: '/outsidereport',
    name: 'Outsidereport',
    component: resolve => require(['@/views/carriage/OutSideReport'], resolve),
    meta: {
      title: '外线批量上报运费',
      keepAlive: false
    }
  },
  {
    path: '/joinreport',
    name: 'JoinReport',
    component: resolve => require(['@/views/carriage/JoinReport'], resolve),
    meta: {
      title: '加盟批量上报运费',
      keepAlive: false
    }
  },
  {
    path: '/outsidefreight',
    name: 'Outsidefreight',
    component: resolve => require(['@/views/carriage/OutSideList'], resolve),
    meta: {
      title: '外线运费上报',
      keepAlive: false
    }
  },
  {
    path: '/outsidefreightlist',
    name: 'Outsidefreightlist',
    component: resolve => require(['@/views/carriage/OutSideFreightList'], resolve),
    meta: {
      title: '外线运费上报',
      keepAlive: false
    }
  },
  {
    path: '/outsidedetail',
    name: 'Outsidedetail',
    component: resolve => require(['@/views/carriage/OutSideDetail'], resolve),
    meta: {
      title: '外线运费详情',
      keepAlive: false
    }
  },
  {
    path: '/joinsearch',
    name: 'Joinsearch',
    component: resolve => require(['@/views/carriage/JoinSearch'], resolve),
    meta: {
      title: '加盟运费',
      keepAlive: false
    }
  },
  {
    path: '/outsidesearch',
    name: 'Outsidesearch',
    component: resolve => require(['@/views/carriage/OutSideListSearch'], resolve),
    meta: {
      title: '外线运费上报',
      keepAlive: false
    }
  },
  {
    path: '/outsidelinesearch',
    name: 'Outsidelinesearch',
    component: resolve => require(['@/views/carriage/OutSideLineSearch'], resolve),
    meta: {
      title: '项目名称',
      keepAlive: false
    }
  }

  // {
  //   path: '/batch',
  //   name: 'batch',
  //   component: resolve => require(['@/views/freight/Batch'], resolve),
  //   meta: {
  //     title: '运费管理'
  //   }
  // },
  // {
  //   path: '/report',
  //   name: 'report',
  //   component: resolve => require(['@/views/freight/Batch/components/Report'], resolve),
  //   meta: {
  //     title: '运费管理'
  //   }
  // },
  // {
  //   path: '/outlineSearch',
  //   name: 'outlineSearch',
  //   component: resolve => require(['@/views/carriage/OutSideListSearch'], resolve),
  //   meta: {
  //     title: '搜索项目'
  //   }
  // },
  // {
  //   path: '/outsidebatch',
  //   name: 'outsidebatch',
  //   component: resolve => require(['@/views/freight/OutSideBatch'], resolve),
  //   meta: {
  //     title: '搜索项目'
  //   }
  // },
  // {
  //   path: '/outsidebatch1',
  //   name: 'outsidebatch1',
  //   component: resolve => require(['@/views/freight/OutSideBatch/index1'], resolve),
  //   meta: {
  //     title: '搜索项目'
  //   }
  // },
]
