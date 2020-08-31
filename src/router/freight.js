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
    path: '/outsidefreight',
    name: 'outsidefreight',
    component: resolve => require(['@/views/freight/OutSideList'], resolve),
    meta: {
      title: '外线运费上报'
    }
  }
]
