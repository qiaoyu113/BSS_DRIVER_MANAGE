import request from '@/utils/request'
let prefix = '/mock/67'

// 外线侧批量上报出车金额
export function reportMoneyBatchBySale(data) {
  return request({
    url: `${prefix}/v2/waybill/shipping/reportMoneyBatchBySale`,
    method: 'post',
    data
  })
}
