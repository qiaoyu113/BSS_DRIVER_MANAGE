import request from '@/utils/request'
// let prefix = '/mock/74'
let prefix = ''
// 创建试跑
export function CreateLntentionRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/creatIntentionRun`,
    // url: `${prefix}/v2/runtest/creatIntentionRun`,
    method: 'post',
    data
  })
}
// 选择司机
export function GetDriverList(data) {
  return request({
    url: `${prefix}/carrier_center/v2/driver/getDriverNoAndNameAndSoOnList`,
    // url: '/mock/103/v2/driver/getDriverList',
    method: 'post',
    data
  })
}
// 选择到仓联系人
export function GetPersonInfo(params) {
  return request({
    url: `${prefix}/line/v2/line/findPersonInfo`,
    // url: '/mock/32/v2/line/findPersonInfo',
    method: 'get',
    params
  })
}
// 试跑
export function TryRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/tryRun`,
    // url: `${prefix}/v2/runtest/tryRun`,
    method: 'post',
    data
  })
}
export function ToTryRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/switchTryRun`,
    // url: `${prefix}/v2/runtest/tryRun`,
    method: 'post',
    data
  })
}
// 跟车
export function FollowCar(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/followCar`,
    // url: `${prefix}/v2/runtest/followCar`,
    method: 'post',
    data
  })
}
// 掉线
export function SwitchTryRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest/switchDropped`,
    // url: `${prefix}/v2/runtest/switchDropped`,
    method: 'post',
    data
  })
}
// 试跑列表
export function GetRunTestInfoList(data) {
  return request({
    url: `${prefix}/waybill_center/v2/runtest/getRunTestInfoList`,
    // url: `${prefix}/v2/runtest/getRunTestInfoList`,
    method: 'post',
    data
  })
}
// 试跑详情
export function GetDetails(params) {
  return request({
    url: `${prefix}/waybill/v2/runtest/runDetial`,
    // url: `${prefix}/v2/runtest/runDetial`,
    method: 'get',
    params
  })
}
// 线路查询
export function GetLine(data) {
  return request({
    // url: `${prefix}/line_center/v2/line/lineInfo/fuzzyCheck`,
    url: `${prefix}/line_center/v2/line/lineInfo/runTestFuzzyCheck`,
    // url: '/mock/32/v2/line/lineInfo/fuzzyCheck',
    method: 'post',
    data
  })
}
// 获取线路详情
export function GetLineDetail(params) {
  return request({
    url: `${prefix}/line_center/v2/line/lineInfo/detail`,
    // url: '/mock/32/v2/line/lineInfo/detail',
    method: 'get',
    params
  })
}

// 创建历史试跑
export function CreateHistoryLntentionRun(data) {
  return request({
    url: `${prefix}/waybill/v2/runtest//makeUpHistoryData`,
    method: 'post',
    data,
    timeout: 16000
  })
}

// 创建历史试跑-线路查询
export function GetLineByCreateHistoryTryRun(data) {
  return request({
    url: `${prefix}/line_center/v2/line/lineInfo/historyRunTestFuzzyCheck`,
    method: 'post',
    data
  })
}


//

export function tryRunExport(data) {
  return request({
    url: '/waybill_center/v2/runtest/export',
    // url: '/mock/32/v2/line/lineInfo/detail',
    method: 'post',
    data
  })
}
