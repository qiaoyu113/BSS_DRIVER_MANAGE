export default [
  {
    path: '/client',
    name: 'Client',
    component: resolve => require(['@/views/client/List'], resolve),
    meta: {
      title: '客户管理',
      keepAlive: true
    }
  },
  {
    path: '/clientSearch',
    name: 'ClientSearch',
    component: resolve => require(['@/views/client/Search'], resolve),
    meta: {
      title: '客户搜索',
      keepAlive: false
    }
  },
  {
    path: '/clientDetail',
    name: 'ClientDetail',
    component: resolve => require(['@/views/client/Detail'], resolve),
    meta: {
      title: '客户详情',
      keepAlive: false
    }
  }
]
