import request from '@/utils/request'
let prefix = '/mock/81/'

/**
 * 新建共享面试表单
 */
export function shareInterview(data) {
  return request({
    url: `${prefix}/v2/driver/share/interview`,
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

/**
 * 司机详情
 */
export function driverDetail(data) {
  return request({
    url: `${prefix}v2/driver/selectDriverDetail`,
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
export function signDeal(data) {
  return request({
    url: `${prefix}/v2/driver/signDeal`,
    method: 'post',
    data
  })
}

/**
 * 标记退出
 */
export function signOut(data) {
  return request({
    url: `${prefix}/v2/driver/signOut`,
    method: 'post',
    data
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
  * 线路信息
  */
export function lineLabel(data) {
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
export function getOperateTime() {
  return request({
    url: `${prefix}/v2/driver/getOperateTime`,
    method: 'get'
  })
}
