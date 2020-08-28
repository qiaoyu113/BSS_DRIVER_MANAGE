export default [
  {
    path: '/tagview',
    name: 'tagview',
    component: resolve => require(['@/views/Driver/TagView/TagView'], resolve),
    meta: {
      title: '打标签',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/driverlist',
    name: 'driverlist',
    component: resolve => require(['@/views/Driver/DriverList/DriverList'], resolve),
    meta: {
      title: '司机管理',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/driversearch',
    name: 'driversearch',
    component: resolve => require(['@/views/Driver/Search/DriverSearch'], resolve),
    meta: {
      title: '司机搜索',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/driverdetail',
    name: 'driverdetail',
    component: resolve => require(['@/views/Driver/DriverDetail/DriverDetail'], resolve),
    meta: {
      title: '司机详情',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/shareinterview',
    name: 'shareinterview',
    component: resolve => require(['@/views/Driver/CreateDriver/ShareInterview'], resolve),
    meta: {
      title: '填写面试表单',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/tailoredinterview',
    name: 'tailoredinterview',
    component: resolve => require(['@/views/Driver/CreateDriver/TailoredInterview'], resolve),
    meta: {
      title: '填写面试表单',
      // auth: true,
      keepAlive: true
    }
  }
]

