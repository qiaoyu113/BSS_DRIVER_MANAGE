import request from '@/utils/request'
// let prefix = '/mock/81'
let prefix = '/driver'
// let linePrefix = '/mock/74'
let linePrefix = '/waybill_center'
// let transportPrefix = '/mock/103'
let transportPrefix = '/carrier_center'
/**
 * 司机列表
 */
export function getDriverList(data) {
  return request({
    url: `${transportPrefix}/v2/driver/getDriverList`,
    method: 'post',
    data
  })
}

/**
 * 新建共享面试表单
 */
export function shareInterview(data) { // y
  return request({
    url: `${prefix}/v2/driver/share/interview`,
    method: 'post',
    data
  })
}
/**
 *
 *
 */
export function getInterview(data) { // y
  return request({
    url: `${prefix}/v2/driver/interview`,
    method: 'get',
    params: data
  })
}

/**
 * 编辑面试表单
 */
export function editInterview(data) {
  return request({
    url: `${prefix}/v2/driver/edit/interview`,
    method: 'post',
    data
  })
}

/**
 * 新建专车面试表单
 */
export function specialInterview(data) {
  return request({
    url: `${prefix}/v2/driver/special/interview`,
    method: 'post',
    data
  })
}

/** *
 * 面试表单手机号唯一效验
 */
export function unqPhone(params) {
  return request({
    url: `${prefix}/v2/driver/check/unq/phone`,
    method: 'post',
    params
  })
}

/**
 * 司机详情
 */
export function driverDetail(data) {
  return request({
    url: `${prefix}/v2/driver/selectDriverDetail`,
    method: 'get',
    params: data
  })
}

// 司机详情 标签信息
export function selectLabel(data) {
  return request({
    url: `${prefix}/v2/driver/selectLabel`,
    method: 'get',
    params: data
  })
}

/**
 * 标记成交
 */
export function signDeal(params) {
  return request({
    url: `${prefix}/v2/driver/signDeal`,
    method: 'post',
    params
  })
}

/**
 * 标记退出
 */
export function signOut(params) {
  return request({
    url: `${prefix}/v2/driver/signOut`,
    method: 'post',
    params
  })
}

/**
 * 打标签
 */
export function insertLabel(data) {
  return request({
    url: `${prefix}/v2/driver/insertLabel`,
    method: 'post',
    data
  })
}

/**
 * 订单信息
 */
export function orderLabel(data) {
  return request({
    url: `${prefix}/v2/driver/selectLabel`,
    method: 'get',
    params: data
  })
}

/**
 * 查询面试表某个时间点的历史数据
 */
export function historyList(data) {
  return request({
    url: `${prefix}/v2/driver/getOperateHistoryList`,
    method: 'get',
    params: data
  })
}

/**
 * 查询所有操作时间点
 */
export function getOperateTime(params) {
  return request({
    url: `${prefix}/v2/driver/getOperateTime`,
    method: 'get',
    params
  })
}

/**
 *
获取线路信息
 */
export function getLingMessageByDriverId(data) {
  return request({
    url: `${linePrefix}/v2/runtest/getLingMessageByDriverId`,
    method: 'get',
    params: data
  })
}

/**
 *修改司机加盟经理
 */
export function updateGmByDriverId(data) {
  return request({
    url: `${prefix}/v2/driver/updateGmByDriverId`,
    method: 'post',
    data
  })
}

// 获取当前加盟经理的推广码
export function GetcreateQrCodeFrontUrl() {
  return request({
    // url: '/mock/112/v2/driver/applet/createQrCodeFront',
    url: `${prefix}/v2/driver/applet/createQrCodeFront`,
    method: 'get'
  })
}

// 司机信息导出
// http://szjw-application-carrier-center.m2.yunniao.cn/v2/driver/export
// http://szjw-application-carrier-center.m2.yunniao.cn/v2/driver/export
export function driverExport(data) {
  return request({
    // url: '/mock/112/v2/driver/applet/createQrCodeFront',
    url: `${transportPrefix}/v2/driver/export`,
    method: 'post',
    data
  })
}
