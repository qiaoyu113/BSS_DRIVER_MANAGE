export default [
  {
    path: '/login',
    name: 'login',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/user/Login'], resolve),
    meta: {
      title: '登录'
      // auth: true,
      // keepAlive: true
    }
  },
  {
    path: '/',
    name: 'index',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/layout/Index'], resolve),
    meta: {
      title: '梧桐综合业务支撑平台'
      // auth: true,
      // keepAlive: true
    }
  },
  {
    path: '/mycenter',
    name: 'mycenter',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/user/MyCenter'], resolve),
    meta: {
      title: '个人中心'
      // auth: true,
      // keepAlive: true
    }
  }
]
