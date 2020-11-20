export default [
  {
    path: '/try-run',
    name: 'TryRun',
    component: resolve => require(['@/views/tryRun/TryRun'], resolve),
    meta: {
      title: '试跑在跑',
      keepAlive: true
    }
  },
  {
    path: '/try-search',
    name: 'TryRunSearch',
    component: resolve => require(['@/views/tryRun/Search'], resolve),
    meta: {
      title: '试跑在跑',
      keepAlive: false
    }
  },
  {
    path: '/try-list',
    name: 'TryRunList',
    component: resolve => require(['@/views/tryRun/TryRunList'], resolve),
    meta: {
      title: '试跑在跑',
      keepAlive: false
    }
  },
  {
    path: '/create-run',
    name: 'CreateRun',
    component: resolve => require(['@/views/tryRun/CreateRun'], resolve),
    meta: {
      title: '确认试跑状态',
      keepAlive: false
    }
  },
  {
    path: '/create-history-run',
    name: 'CreateHistoryRun',
    component: resolve => require(['@/views/tryRun/CreateHistoryRun'], resolve),
    meta: {
      title: '创建历史试跑',
      keepAlive: false
    }
  },
  {
    path: '/to-try',
    name: 'ToTryRun',
    component: resolve => require(['@/views/tryRun/ToTryRun'], resolve),
    meta: {
      title: '转试跑',
      keepAlive: false
    }
  },
  {
    path: '/off-try',
    name: 'OffTry',
    component: resolve => require(['@/views/tryRun/OffTry'], resolve),
    meta: {
      title: '转掉线',
      keepAlive: false
    }
  },
  {
    path: '/try-detail',
    name: 'TryRunDetail',
    component: resolve => require(['@/views/tryRun/TryRunDetail'], resolve),
    meta: {
      title: '详情页',
      keepAlive: false
    }
  }
]
