import request from '@/utils/request'

/* 车辆成交数据统计 */
export function queryVehicleTransactionStatistics(data) {
  return request({
    url: '/api/order/business/operation/queryVehicleTransactionStatistics',
    method: 'post',
    data
  })
}

/* 车辆成交数据统计修改 */
export function updateVehicleTransactionStatistics(data) {
  return request({
    url: '/api/order/business/operation/updateVehicleTransactionStatistics',
    method: 'post',
    data
  })
}
