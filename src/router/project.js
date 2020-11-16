export default [
  {
    path: '/project',
    name: 'Project',
    component: resolve => require(['@/views/project/List'], resolve),
    meta: {
      title: '项目管理',
      keepAlive: true
    }
  },
  {
    path: '/projectSearch',
    name: 'ProjectSearch',
    component: resolve => require(['@/views/project/Search'], resolve),
    meta: {
      title: '项目搜索',
      keepAlive: false
    }
  },
  {
    path: '/projectDetail',
    name: 'ProjectDetail',
    component: resolve => require(['@/views/project/Detail'], resolve),
    meta: {
      title: '项目详情',
      keepAlive: false
    }
  }
]
