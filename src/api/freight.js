import request from '@/utils/request'
let prefix = '/mock/95'
export function getConfirmInfoList(data) {
  return request({
    url: `${prefix}/v2/waybill/getConfirmInfoList`, // 确认运单列表
    method: 'post',
    data
  })
}
export function getGmInfoList(data) {
  return request({
    url: `${prefix}/v2/waybill/getGmInfoList`, // 加盟测列表
    method: 'post',
    data
  })
}

export function getLineInfoList(data) {
  return request({
    url: `${prefix}/v2/waybill/getLineInfoList`, // 外线测列表
    method: 'post',
    data
  })
}
export function noCar(data) {
  return request({
    url: `${prefix}/v2/waybill/shipping/noCar`, // GMC单个设置未出车
    method: 'post',
    data
  })
}
export function shippingDetailByGM(data) {
  return request({
    url: `${prefix}/v2/waybill/shipping/shippingDetailByGM`, // 加盟侧查询出车详情
    method: 'post',
    data
  })
}
export function getGmInfoListByKeyWorld(data) {
  return request({
    url: `${prefix}/v2/waybill/getGmInfoListByKeyWorld`, // 加盟测列表-搜索框查询
    method: 'post',
    data
  })
}
export function wayBillAmountDetail(data) {
  return request({
    url: `${prefix}/v2/waybill/wayBillAmountDetail`, // 批量上报/确认运费回显
    method: 'post',
    data
  })
}
export function noCarBatchByGM(data) {
  return request({
    url: `${prefix}/v2/waybill/noCarBatchByGM`, // 加盟侧批量设置未出车
    method: 'post',
    data
  })
}

