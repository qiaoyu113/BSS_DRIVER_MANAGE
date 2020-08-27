export default [
  {
    path: '/try-run',
    name: 'TryRun',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/tryRun/TryRun'], resolve),
    meta: {
      title: '试跑-在跑'
    }
  },
  {
    path: '/try-run/search',
    name: 'TryRunSearch',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/tryRun/Search'], resolve),
    meta: {
      title: '试跑-在跑'
    }
  }
]
