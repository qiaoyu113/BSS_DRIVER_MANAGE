import request from '@/utils/request'
// let prefix = '/api/waybill'
let prefix = 'mock/95'
// 加盟运费接口
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

export function shippingDetailByGM(data) {
  return request({
    url: `${prefix}/v2/waybill/shippingDetailByGM`, // 加盟侧查询出车详情
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
export function reportMoneyBatchByGM(data) {
  return request({
    url: `${prefix}//v2/waybill/reportMoneyBatchByGM `, // 加盟侧批量上报出车金额
    method: 'post',
    data
  })
}
// 线外列表运费接口
export function getLineInfoList(data) {
  return request({
    url: `${prefix}/v2/waybill/getLineInfoList`, // 外线测列表
    method: 'post',
    data
  })
}
export function noCarBatchBySale(data) {
  return request({
    url: `${prefix}/v2/waybill/noCarBatchBySale`, // 外线侧批量设置未出车
    method: 'post',
    data
  })
}
export function noCarBySale(data) {
  return request({
    url: `${prefix}/v2/waybill/noCarBySale`, // 外线侧单个设置未出车
    method: 'post',
    data
  })
}
export function reportMoneyBatchBySale(data) {
  return request({
    url: `${prefix}/v2/waybill/reportMoneyBatchBySale`, // 外线侧批量上报出车金额
    method: 'post',
    data
  })
}
export function reportMoneyBySale(data) {
  return request({
    url: `${prefix}/v2/waybill/reportMoneyBySale`, // 外线侧单个出车金额上报
    method: 'post',
    data
  })
}
export function shippingDetailBySale(data) {
  return request({
    url: `${prefix}/v2/waybill/shippingDetailBySale`, // 外线侧单个出车金额上报
    method: 'post',
    data
  })
}

