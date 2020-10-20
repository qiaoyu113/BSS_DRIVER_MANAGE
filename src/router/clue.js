export default [
  {
    path: '/clue',
    name: 'clue',
    component: resolve => require(['@/views/clue/Clue'], resolve),
    meta: {
      title: '线索管理'
      // keepAlive: true
    }
  },
  {
    path: '/cluesearch',
    name: 'cluesearch',
    component: resolve => require(['@/views/clue/ClueSearch'], resolve),
    meta: {
      title: '线索搜索'
    }
  },
  {
    path: '/cluedetail',
    name: 'cluedetail',
    component: resolve => require(['@/views/clue/ClueDetail'], resolve),
    meta: {
      title: '线索详情'
      // auth: true,
    }
  },
  {
    path: '/clueedit',
    name: 'clueedit',
    component: resolve => require(['@/views/clue/ClueEdit'], resolve),
    meta: {
      title: '线索编辑'
      // auth: true,
    }
  }
]

