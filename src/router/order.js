export default [
  {
    path: '/orderDetail',
    name: 'orderdetail',
    component: resolve => require(['@/views/order/OrderDetail/OrderDetail'], resolve),
    meta: {
      title: '订单详情'
    }
  },
  {
    path: '/createOrder',
    name: 'createOrder',
    component: resolve => require(['@/views/order/CreateOrder/CreateOrder'], resolve),
    meta: {
      title: '订单录入'
    }
  },
  {
    path: '/orderAudit',
    name: 'orderAudit',
    component: resolve => require(['@/views/order/OrderDetail/OrderDetail'], resolve),
    meta: {
      title: '订单审核'
    }
  },
  {
    path: '/resetOrder',
    name: 'resetOrder',
    component: resolve => require(['@/views/order/CreateOrder/CreateOrder'], resolve),
    meta: {
      title: '重新录入'
      // keepAlive: true
    }
  },
  {
    path: '/addPay',
    name: 'addPay',
    component: resolve => require(['@/views/order/CreateOrder/AddPay'], resolve),
    meta: {
      title: '添加支付记录'
    }
  }
]

