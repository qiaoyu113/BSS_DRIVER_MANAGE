import request from '@/utils/request'
let transportPrefix = '/carrier_center'
let prefix = '/driver'
// let prefix = '/mock/81'
// let transportPrefix = '/mock/81'
/**
 * 获取线索列表
 */
export function getClueList(data) {
// export function fetchList(data) {
  return request({
    url: `${transportPrefix}/v2/clue/getClueList`,
    method: 'post',
    data
  })
}
// driver/v2/clue/updateGmByClueId
export function updateGmByClueId(data) {
  return request({
    url: '/driver/v2/clue/updateGmByClueId',
    method: 'post',
    data
  })
}

/**
 * 线索详情
 */
export function clueInfo(data) {
  return request({
    url: `${prefix}/v2/clue/info`,
    method: 'get',
    params: data
  })
}

/**
 * 线索编辑
 */
export function clueEdit(data) {
  return request({
    url: `${prefix}/v2/clue/edit`,
    method: 'post',
    data
  })
}
// 获取加盟/渠道经理
export function GetSpecifiedLower(data) {
  return request({
    url: `${prefix}/v2/clue/getSpecifiedLowerUserListByCondition`,
    method: 'post',
    data
  })
}
