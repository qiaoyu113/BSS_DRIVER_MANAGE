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
    path: '/try-search',
    name: 'TryRunSearch',
    component: resolve => require(['@/views/tryRun/Search'], resolve),
    meta: {
      title: '试跑-在跑'
    }
  },
  {
    path: '/try-list',
    name: 'TryRunList',
    component: resolve => require(['@/views/tryRun/TryRunList'], resolve),
    meta: {
      title: '试跑-在跑'
    }
  },
  {
    path: '/create-run',
    name: 'CreateRun',
    component: resolve => require(['@/views/tryRun/CreateRun'], resolve),
    meta: {
      title: '创建试跑'
    }
  },
  {
    path: '/to-try',
    name: 'ToTryRun',
    component: resolve => require(['@/views/tryRun/ToTryRun'], resolve),
    meta: {
      title: '转试跑'
    }
  },
  {
    path: '/off-try',
    name: 'OffTry',
    component: resolve => require(['@/views/tryRun/OffTry'], resolve),
    meta: {
      title: '转掉线'
    }
  },
  {
    path: '/try-detail',
    name: 'TryRunDetail',
    component: resolve => require(['@/views/tryRun/TryRunDetail'], resolve),
    meta: {
      title: '详情页'
    }
  }
]
