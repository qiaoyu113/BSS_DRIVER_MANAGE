export default [
  {
    path: '/freight',
    name: 'freight',
    component: resolve => require(['@/views/freight/List'], resolve),
    meta: {
      title: '运费管理'
    }
  },
  {
    path: '/outsidefreight',
    name: 'outsidefreight',
    component: resolve => require(['@/views/freight/OutSideList'], resolve),
    meta: {
      title: '外线运费上报'
    }
  },
  {
    path: '/cardltem',
    name: 'cardltem',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/freight/List/components/Cardltem'], resolve),
    meta: {
      title: '运费'
    }
  },
  {
    path: '/detail',
    name: 'detail',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/freight/JoinDetail/index'], resolve),
    meta: {
      title: '运费详情'
    }
  },
  {
    path: '/batch',
    name: 'batch',
    component: resolve => require(['@/views/freight/Batch'], resolve),
    meta: {
      title: '运费管理'
    }
  },
  {
    path: '/report',
    name: 'report',
    component: resolve => require(['@/views/freight/Batch/components/Report'], resolve),
    meta: {
      title: '运费管理'
    }
  },
  {
    path: '/outlineSearch',
    name: 'outlineSearch',
    component: resolve => require(['@/views/freight/OutSideSearch'], resolve),
    meta: {
      title: '搜索项目'
    }
  },
  {
    path: '/outsidebatch',
    name: 'outsidebatch',
    component: resolve => require(['@/views/freight/OutSideBatch'], resolve),
    meta: {
      title: '搜索项目'
    }
  },
  {
    path: '/outsidebatch1',
    name: 'outsidebatch1',
    component: resolve => require(['@/views/freight/OutSideBatch/index1'], resolve),
    meta: {
      title: '搜索项目'
    }
  },
  {
    path: '/outsidereport',
    name: 'outsidereport',
    component: resolve => require(['@/views/freight/OutSideBatch/components/Report'], resolve),
    meta: {
      title: '批量上报运费'
    }
  },
  {
    path: '/joinsearch',
    name: 'joinsearch',
    component: resolve => require(['@/views/freight/JoinSearch/index'], resolve),
    meta: {
      title: '搜索项目'
    }
  }
]
