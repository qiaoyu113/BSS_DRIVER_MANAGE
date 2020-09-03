import request from '@/utils/request'
let prefix = '/mock/88/'

/**
 * 订单审核
 */
export function auditOrderNoPass(data) {
  return request({
    url: `${prefix}/v2/order/auditOrderNoPass`,
    method: 'post',
    data
  })
}

/**
 * 订单详情
 */
export function orderDetail(data) {
  return request({
    url: `${prefix}/v2/order/getOrderDetialByDriverId`,
    method: 'get',
    params: data
  })
}

/**
 * 订单录入
 */
export function createOrUpdateOrder(data) {
  return request({
    url: `${prefix}/v2/order/createOrUpdateOrder`,
    method: 'post',
    data
  })
}

