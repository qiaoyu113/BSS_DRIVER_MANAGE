export default [
  {
    path: '/clue',
    name: 'clue',
    component: resolve => require(['@/views/clue/Clue'], resolve),
    meta: {
      title: '线索管理',
      // auth: true,
      keepAlive: true
    }
  },
  {
    path: '/cluedetail',
    name: 'cluedetail',
    component: resolve => require(['@/views/clue/ClueDetail'], resolve),
    meta: {
      title: '线索详情',
      // auth: true,
      keepAlive: true
    }
  }
]

