import request from '@/utils/request'
let prefix = '/mock/18'
// 获客户路列表
export function getClientList(data) {
  return request({
    url: `${prefix}/v2/line/customer/queryLineCustomerList`,
    method: 'post',
    data
  })
}
// 获取客户详情
export function getClientDetail(params) {
  return request({
    url: `${prefix}/v2/line/customer/findCustomerInfo`,
    method: 'get',
    params
  })
}

