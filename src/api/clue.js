import request from '@/utils/request'
let prefix = '/driver'
// let prefix = '/mock/81'

export function fetchList(data) {
  return request({
    url: 'api/bss/v1/bss/driver/clue/selectListByKey',
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
