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
    name: 'driverlist',
    component: resolve => require(['@/views/driver/DriverList/DriverList'], resolve),
    meta: {
      title: '司机管理'
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
      title: '填写面试表单'
    }
  },
  {
    path: '/tailoredinterview',
    name: 'tailoredinterview',
    component: resolve => require(['@/views/driver/CreateDriver/TailoredInterview'], resolve),
    meta: {
      title: '填写面试表单'
    }
  }
]

