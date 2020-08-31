import request from '@/utils/request'

export function getLineList(data) {
  return request({
    url: '/v2/line/customer/queryLineCustomerList',
    method: 'post',
    data
  })
}

