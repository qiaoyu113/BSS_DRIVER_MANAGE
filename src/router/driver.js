export default [
  {
    path: '/tagview',
    name: 'tagview',
    component: resolve => require(['@/views/driver/TagView/TagView'], resolve),
    meta: {
      title: '打标签'
    }
  },
  {
    path: '/driverlist',
    name: 'DriverList',
    component: resolve => require(['@/views/driver/DriverList/DriverList'], resolve),
    meta: {
      title: '司机管理',
      keepAlive: true
    }
  },
  {
    path: '/driversearch',
    name: 'driversearch',
    component: resolve => require(['@/views/driver/Search/DriverSearch'], resolve),
    meta: {
      title: '司机搜索'
    }
  },
  {
    path: '/driverdetail',
    name: 'driverdetail',
    component: resolve => require(['@/views/driver/DriverDetail/DriverDetail'], resolve),
    meta: {
      title: '司机详情'
    }
  },
  {
    path: '/shareinterview',
    name: 'shareinterview',
    component: resolve => require(['@/views/driver/CreateDriver/ShareInterview'], resolve),
    meta: {
      title: '填写共享面试表单',
      keepAlive: false
    }
  },
  {
    path: '/tailoredinterview',
    name: 'tailoredinterview',
    component: resolve => require(['@/views/driver/CreateDriver/TailoredInterview'], resolve),
    meta: {
      title: '填写专车面试表单',
      keepAlive: false
    }
  },
  {
    path: '/editTailored',
    name: 'editTailored',
    component: resolve => require(['@/views/driver/CreateDriver/TailoredInterview'], resolve),
    meta: {
      title: '编辑专车面试表单',
      keepAlive: false
    }
  },
  {
    path: '/editShare',
    name: 'editShare',
    component: resolve => require(['@/views/driver/CreateDriver/ShareInterview'], resolve),
    meta: {
      title: '编辑共享面试表单',
      keepAlive: false
    }
  },
  {
    path: '/driverLog',
    name: 'driverLog',
    component: resolve => require(['@/views/driver/DriverLog/DriverLog'], resolve),
    meta: {
      title: '操作记录'
    }
  }
]

