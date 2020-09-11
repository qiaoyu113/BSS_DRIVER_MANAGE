export default [
  {
    path: '/freight',
    name: 'freight',
    component: resolve => require(['@/views/carriage/JoinList'], resolve),
    meta: {
      title: '运费管理'
    }
  },
  {
    path: '/joindetail',
    name: 'joindetail',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/carriage/JoinDetail'], resolve),
    meta: {
      title: '运费详情'
    }
  },
  {
    path: '/outsidereport',
    name: 'outsidereport',
    component: resolve => require(['@/views/carriage/OutSideReport'], resolve),
    meta: {
      title: '外线批量上报运费'
    }
  },
  {
    path: '/joinreport',
    name: 'joinreport',
    component: resolve => require(['@/views/carriage/JoinReport'], resolve),
    meta: {
      title: '加盟批量上报运费'
    }
  },
  {
    path: '/outsidefreight',
    name: 'outsidefreight',
    component: resolve => require(['@/views/carriage/OutSideList'], resolve),
    meta: {
      title: '外线运费上报'
    }
  },
  {
    path: '/outsidefreightlist',
    name: 'outsidefreightlist',
    component: resolve => require(['@/views/carriage/OutSideFreightList'], resolve),
    meta: {
      title: '外线运费上报'
    }
  },
  {
    path: '/outsidedetail',
    name: 'outsidedetail',
    component: resolve => require(['@/views/carriage/OutSideDetail'], resolve),
    meta: {
      title: '外线运费详情'
    }
  },
  {
    path: '/joinsearch',
    name: 'joinsearch',
    component: resolve => require(['@/views/carriage/JoinSearch'], resolve),
    meta: {
      title: '搜索项目'
    }
  },
  {
    path: '/outsidesearch',
    name: 'outsidesearch',
    component: resolve => require(['@/views/carriage/OutSideListSearch'], resolve),
    meta: {
      title: '搜索项目'
    }
  },
  {
    path: '/outsidelinesearch',
    name: 'outsidelinesearch',
    component: resolve => require(['@/views/carriage/OutSideLineSearch'], resolve),
    meta: {
      title: '搜索项目'
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
