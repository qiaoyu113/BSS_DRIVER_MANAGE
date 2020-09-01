export default [
  {
    path: '/freight',
    name: 'freight',
    component: resolve => require(['@/views/freight/List'], resolve),
    meta: {
      title: '运费管理'
    }
  },
  {
    path: '/cardltem',
    name: 'cardltem',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/freight/List/components/Cardltem'], resolve),
    meta: {
      title: '运费'
    }
  },
  {
    path: '/Detail',
    name: 'Detail',
    // component: () => import(/* webpackChunkName: "login" */ 'views/user/Login.vue'),
    component: resolve => require(['@/views/freight/Detail'], resolve),
    meta: {
      title: '运费'
    }
  },
  {
    path: '/Batch',
    name: 'Batch',
    component: resolve => require(['@/views/freight/Batch'], resolve),
    meta: {
      title: '运费管理'
    }
  },
  {
    path: '/Report',
    name: 'Report',
    component: resolve => require(['@/views/freight/Batch/components/Report'], resolve),
    meta: {
      title: '运费管理'
    }
  }

 


]
