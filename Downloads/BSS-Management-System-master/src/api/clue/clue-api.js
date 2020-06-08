import request from '@/utils/request'

/* 订单列表 */
export function getClueList(data) {
  return request({
    url: '/api/bss/v1/bss/driver/clue/selectListByKey',
    method: 'post',
    data
  })
}

/* 订单列表 */
export function saveClue(data) {
  return request({
    url: '/api/driver/driver/clue/updateInfo',
    method: 'post',
    data
  })
}

// 转变订单
export function translateClue(data) {
  return request({
    url: '/api/driver/driver/clue/commitConversion',
    method: 'post',
    data
  })
}

// 线索详情
export function GetClueDetail(data) {
  return request({
    url: '/api/driver/driver/clue/detail',
    method: 'get',
    params: data
  })
}

// 线索详情
export function PostClueDetail(data) {
  return request({
    url: '/api/driver/driver/clue/getBasicDetail',
    method: 'post',
    params: data
  })
}

// 线索更多信息
export function GetClueDetailInformation(data) {
  return request({
    url: '/api/driver/driver/clue/getAssistDetail',
    method: 'post',
    params: data
  })
}

// 创建线索
export function creatClue(data) {
  return request({
    url: '/api/driver/driver/clue/bss/create',
    method: 'post',
    data
  })
}

// 线索跟进
export function clueFollow(data) {
  return request({
    url: '/api/driver/driver/clue/bss/clueFollow',
    method: 'post',
    data
  })
}

// 线索详情
export function clueInfo(data) {
  return request({
    url: '/api/driver/driver/clue/bss/clueInfo',
    method: 'get',
    params: data
  })
}

// 线索分配
export function clueDistribute(data) {
  return request({
    url: '/api/driver/driver/clue/bss/clueDistribute',
    method: 'post',
    data
  })
}

// 线索日志
export function GetClueLog(data) {
  return request({
    url: '/api/driver/driver/clue/log/list',
    method: 'get',
    params: data
  })
}

// 拓展经理列表
export function getBDManager(data) {
  return request({
    url: '/api/base/user/bss/getBDManager',
    method: 'get',
    params: data
  })
}

// 拓展经理列表
export function checkManager(data) {
  return request({
    url: '/api/driver/driver/clue/bss/updateBDManager',
    method: 'post',
    data
  })
}

// 线索导出
export function exportExcelClueList(data) {
  return request({
    url: '/api/bss/v1/bss/driver/clue/export',
    method: 'post',
    responseType: 'blob',
    data
  })
}

/**
 * 我的推荐列表查询
 * @param  {object} data
 * @param  {number} data.carType 车型
 * @param  {string} data.clueId 线索编号
 * @param  {number} data.isSettledIn 是否入驻(1是2否)
 * @param  {number} data.limit 页大小 默认100
 * @param  {string} data.name 司机姓名
 * @param  {number} data.page 页号 默认1
 * @param  {string} data.recommender 推荐人
 */
export function selectMyRecommendList(data) {
  return request({
    url: '/api/bss/v1/bss/driver/clue/selectMyRecommendList',
    method: 'post',
    data
  })
}

/**
 * 我的推荐列表导出
 * @param  {object} data
 * @param  {number} data.carType 车型
 * @param  {string} data.clueId 线索编号
 * @param  {number} data.isSettledIn 是否入驻(1是2否)
 * @param  {string} data.name 司机姓名
 * @param  {string} data.recommender 推荐人
 */
export function myRecommendListExport(data) {
  return request({
    url: '/api/bss/v1/bss/driver/clue/myRecommendListExport',
    method: 'post',
    responseType: 'blob',
    data
  })
}
