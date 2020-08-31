export default [
  {
    path: '/freight',
    name: 'freight',
    component: resolve => require(['@/views/freight/List'], resolve),
    meta: {
      title: '运费管理'
    }
  }
  // {
  //   path: '/cardltem',
  //   name: 'cardltem',
  //   // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
  //   component: resolve => require(['@/views/freight/components/cardltem'], resolve),
  //   meta: {
  //     title: '运费'
  //   }
  // },
  // {
  //   path: '/Details',
  //   name: 'Details',
  //   // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
  //   component: resolve => require(['@/views/freight/components/Details'], resolve),
  //   meta: {
  //     title: '运费'
  //   }
  // },
  // {
  //   path: '/batch',
  //   name: 'batch',
  //   // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
  //   component: resolve => require(['@/views/freight/batch'], resolve),
  //   meta: {
  //     title: '运费'
  //   }
  // },
  // {
  //   path: '/list',
  //   name: 'list',
  //   // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
  //   component: resolve => require(['@/views/freight/batch'], resolve),
  //   meta: {
  //     title: '运费'
  //   }
  // }

]
