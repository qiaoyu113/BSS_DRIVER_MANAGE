export default [
  {
    path: '/line',
    name: 'line',
    component: resolve => require(['@/views/line/List'], resolve),
    meta: {
      title: '线索管理',
      keepAlive: true
    }
  },
  {
    path: '/lineDetail',
    name: 'lineDetail',
    component: resolve => require(['@/views/line/Detail'], resolve),
    meta: {
      title: '线索详情',
      keepAlive: true
    }
  },
  {
    path: '/lineTag',
    name: 'lineTag',
    component: resolve => require(['@/views/line/Tag'], resolve),
    meta: {
      title: '打标签',
      keepAlive: true
    }
  },
  {
    path: '/recordLine',
    name: 'RecordLine',
    component: resolve => require(['@/views/line/RecordLine'], resolve),
    meta: {
      title: '补录线路',
      keepAlive: true
    }
  }
]

