export default [
  {
    path: '/try-run',
    name: 'TryRun',
    component: resolve => require(['@/views/tryRun/TryRun'], resolve),
    meta: {
      title: '试跑-在跑'
    }
  },
  {
    path: '/try-run/search',
    name: 'TryRunSearch',
    component: resolve => require(['@/views/tryRun/Search'], resolve),
    meta: {
      title: '试跑-在跑'
    }
  },
  {
    path: '/try-run/list',
    name: 'TryRunList',
    component: resolve => require(['@/views/tryRun/TryRunList'], resolve),
    meta: {
      title: '试跑-在跑'
    }
  },
  {
    path: '/try-run/createrun',
    name: 'CreateRun',
    component: resolve => require(['@/views/tryRun/CreateRun'], resolve),
    meta: {
      title: '创建试跑'
    }
  },
  {
    path: '/try-run/detail',
    name: 'TryRunDetail',
    component: resolve => require(['@/views/tryRun/TryRunDetail'], resolve),
    meta: {
      title: '详情页'
    }
  }
]
