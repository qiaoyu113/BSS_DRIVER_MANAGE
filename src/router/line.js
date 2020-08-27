export default [
  {
    path: '/line',
    name: 'line',
    component: resolve => require(['@/views/line/List'], resolve),
    meta: {
      title: '线索管理',
      keepAlive: false
    }
  },
  {
    path: '/lineDetail',
    name: 'lineDetail',
    component: resolve => require(['@/views/line/Detail'], resolve),
    meta: {
      title: '线索详情',
      keepAlive: false
    }
  },
  {
    path: '/lineTag',
    name: 'lineTag',
    component: resolve => require(['@/views/line/Tag'], resolve),
    meta: {
      title: '打标签',
      keepAlive: false
    }
  },
  {
    path: '/recordLine',
    name: 'RecordLine',
    component: resolve => require(['@/views/line/RecordLine'], resolve),
    meta: {
      title: '补录线路',
      keepAlive: false
    }
  },
  {
    path: '/createLine',
    name: 'CreateLine',
    component: resolve => require(['@/views/line/CreateLine'], resolve),
    meta: {
      title: '发布稳定线路',
      keepAlive: false
    }
  },
  {
    path: '/editLine',
    name: 'EditLine',
    component: resolve => require(['@/views/line/EditLine'], resolve),
    meta: {
      title: '编辑稳定线路',
      keepAlive: false
    }
  },
  {
    path: '/copyLine',
    name: 'CopyLine',
    component: resolve => require(['@/views/line/CopyLine'], resolve),
    meta: {
      title: '复制稳定线路',
      keepAlive: false
    }
  },
  {
    path: '/activeLine',
    name: 'ActiveLine',
    component: resolve => require(['@/views/line/ActiveLine'], resolve),
    meta: {
      title: '激活稳定线路',
      keepAlive: false
    }
  }
]

