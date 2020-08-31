export default [
  {
    path: '/shipping',
    name: 'shipping',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/shipping/index'], resolve),
    meta: {
      title: '运费'
    }
  },
  {
    path: '/cardltem',
    name: 'cardltem',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/shipping/components/cardltem'], resolve),
    meta: {
      title: '运费'
    }
  },
  {
    path: '/Details',
    name: 'Details',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/shipping/components/Details'], resolve),
    meta: {
      title: '运费'
    }
  },
  {
    path: '/batch',
    name: 'batch',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/shipping/batch/index'], resolve),
    meta: {
      title: '运费'
    }
  },
  {
    path: '/list',
    name: 'list',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/shipping/batch/components/list'], resolve),
    meta: {
      title: '运费'
    }
  }

]
