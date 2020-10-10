import request from '@/utils/request'
/**
 * 获取线索列表
 */
export function getClueList(data) {
  return request({
    url: 'carrier_center/v2/clue/getClueList',
    method: 'post',
    data
  })
}
