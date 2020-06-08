import request from '@/utils/request'

/* 标书列表 */
export function GetTenderList(data) {
  return request({
    url: '/api/bss/v1/bss/tender/selectListByKey',
    method: 'post',
    data
  })
}

/* 待撮合标书列表 */
export function GetTenderListPending(data) {
  return request({
    url: '/api/bss/v1/bss/tender/selectListByQuery/waitPending',
    method: 'post',
    data
  })
}

/* 已撮合标书列表 */
export function GetTenderListPended(data) {
  return request({
    url: '/api/bss/v1/bss/tender/selectListByQuery/havePended',
    method: 'post',
    data
  })
}

/* 已下线标书列表 */
export function GetTenderListOffined(data) {
  return request({
    url: '/api/bss/v1/bss/tender/selectListByQuery/haveOffined',
    method: 'post',
    data
  })
}

/* 日志列表 */
export function GetTenderLog(data) {
  return request({
    url: '/api/match/tender/log/list',
    method: 'get',
    params: data
  })
}

/* 选择司机 */
export function GetChooseDrive(data) {
  return request({
    url: '/api/match/tender/chooseDriver',
    method: 'post',
    data
  })
}

/* 标书详情 */
export function GetTenderDetail(data) {
  return request({
    url: '/api/line/line/task/detail',
    method: 'get',
    params: data
  })
}

/* 标书审核 */
export function NopassTender(data) {
  return request({
    url: 'api/line/line/task/inspectNotPass',
    method: 'post',
    data
  })
}

/* 标书审核 */
export function passTender(data) {
  return request({
    url: 'api/line/line/task/inspectPass',
    method: 'post',
    data
  })
}

/* 标书总数 */
export function GetLineTotal(data) {
  return request({
    url: '/api/match/tender/aggLineTaskData',
    method: 'get',
    params: data
  })
}

/* 下线操作 */
export function offLine(data) {
  return request({
    url: '/api/match/tender/manualOffline',
    method: 'post',
    data
  })
}

/* 下线操作 */
export function getNewTender(data) {
  return request({
    url: '/api/line/line/task/manuallyCreateTender',
    method: 'post',
    data
  })
}

/* 获取司机列表状态 */
export function getDriverListForChooseDriver(data) {
  return request({
    url: '/api/bss/v1/bss/driver/getDriverListForChooseDriver',
    method: 'post',
    data
  })
}

/* 上线操作 */
export function upOnLine(data) {
  return request({
    url: '/api/match/tender/wakeUpOnline',
    method: 'post',
    data
  })
}

/* 判断当前司机有无订单 */
export function JudgeOrderByDriver(data) {
  return request({
    url: '/api/order/order/judgeOrderByDriver',
    method: 'get',
    params: data
  })
}

/* 获取全部线路标书的列表 */
export function GetAllTenderList(data) {
  return request({
    url: '/api/bss/v1/bss/tender/listByLineId',
    method: 'post',
    data
  })
}

/**
 * 创建标书
 * @param  {object} data
 * @param  {string} data.deliveryDate 配送日期
 * @param  {number} data.deliveryDateType 配送日期类型【1随时上岗，2固定日期】
 * @param  {number} data.guidePrice 参考价格 正整数，小于6位数
 * @param  {string} data.lineId 线路编号
 * @param  {number} data.tenderType 标书类型【1普通标书；2竞价标书】
 */
export function CreateTender(data) {
  return request({
    url: '/api/line/line/task/createTenderByType',
    method: 'post',
    data
  })
}

/**
 * 标书总列表
 * @param  {object} data
 * @param  {string} data.key 搜索关键字
 * @param  {number} data.limit 页大小 默认100
 * @param  {number} data.page 页号 默认1
 * @param  {string} data.startDate 开始时间
 * @param  {string} data.endDate 结束时间
 * @param  {number} data.state 状态
 *
 */
export function TenderListAll(data) {
  return request({
    url: '/api/bss/v1/bss/tender/selectListByKey/tenderListAll',
    method: 'post',
    data
  })
}

/**
 * 标书详情（竞价）
 * @param  {object} data
 * @param  {number} data.tenderId 标书ID
 */
export function tenderDetail(data) {
  return request({
    url: '/api/line/line/task/tenderDetail',
    method: 'get',
    params: data
  })
}

/**
 * 标书详情（竞价）
 * @param  {object} data
 * @param  {number} data.tenderId 标书ID
 */
export function biddingBidderDriverList(data) {
  return request({
    url: '/api/match/tender/biddingBidderDriverList',
    method: 'get',
    params: data
  })
}

/**
 * 标书详情（竞价）
 * @param  {object} data
 * @param  {number} data.tenderId 标书ID
 * @param  {string} data.driverId 司机编号
 * @param  {number} data.price 成交价格
 * @param  {string} data.reason 不成交的原因
 * @param  {number} data.state 标记位【1，成交，2 不成交】
 */
export function dealOrNot(data) {
  return request({
    url: '/api/match/tender/biddingBidder/driver/dealOrNot',
    method: 'post',
    data
  })
}
