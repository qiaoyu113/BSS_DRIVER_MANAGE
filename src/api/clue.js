import request from '@/utils/request'
let transportPrefix = '/carrier_center'
// let transportPrefix = '/mock/81'
/**
 * 获取线索列表
 */
export function getClueList(data) {
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
