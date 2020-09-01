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
    component: resolve => require(['@/views/freight/Detail'], resolve),
    meta: {
      title: '运费'
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
    path: '/search',
    name: 'search',
    component: resolve => require(['@/views/freight/Search'], resolve),
    meta: {
      title: '运费管理'
    }
  }

]
