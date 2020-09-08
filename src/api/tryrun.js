import request from '@/utils/request'
let prefix = '/api'
// 创建试跑
export function CreateLntentionRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/creatIntentionRun`,
    method: 'post',
    data
  })
}
// 选择司机
export function GetDriverList(data) {
  return request({
    url: `${prefix}/carrier_center/v2/driver/getDriverList`,
    method: 'post',
    data
  })
}
// 选择到仓联系人
export function GetPersonInfo(params) {
  return request({
    url: `${prefix}/line/v2/line/findPersonInfo`,
    method: 'get',
    params
  })
}
// 试跑
export function TryRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/tryRun`,
    method: 'post',
    data
  })
}
// 跟车
export function FollowCar(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/followCar`,
    method: 'post',
    data
  })
}
// 掉线
export function SwitchTryRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/switchDropped`,
    method: 'post',
    data
  })
}
// 试跑列表
export function GetRunTestInfoList(data) {
  return request({
    url: `${prefix}/waybill_center/v2/runtest/getRunTestInfoList`,
    method: 'post',
    data
  })
}
// 试跑详情
export function GetDetails(params) {
  return request({
    url: `${prefix}/waybill/v2/runtest/runDetial`,
    method: 'get',
    params
  })
}
// 线路查询
export function GetLine(data) {
  return request({
    url: `${prefix}/line_center/v2/line/lineInfo/fuzzyCheck`,
    method: 'post',
    data
  })
}
// 获取线路详情
export function GetLineDetail(params) {
  return request({
    url: `${prefix}/line_center/v2/line/lineInfo/detail`,
    method: 'get',
    params
  })
}
