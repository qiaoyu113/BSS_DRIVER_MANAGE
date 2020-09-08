import request from '@/utils/request'
/* 线路货主 */
export function getLineUser(data) {
  return request({
    url: '/bss/v1/bss/line/customer/fuzzy/list',
    method: 'get',
    params: data
  })
}
/* 新建线路 */
export function postCreatLine(data) {
  return request({
    url: '/line/line/task/create',
    method: 'post',
    data
  })
}
/* 线路详情 */
export function getLineDetail(data) {
  return request({
    url: '/line/line/task/detail',
    method: 'get',
    params: data
  })
}

/* 编辑线路 */
export function putCreatLine(data) {
  return request({
    url: '/line/line/task/edit',
    method: 'post',
    data
  })
}
/* 标书审核 */
export function NopassTender(data) {
  return request({
    url: '/line/line/task/inspectNotPass',
    method: 'post',
    data
  })
}

/* 标书审核 */
export function passTender(data) {
  return request({
    url: '/line/line/task/inspectPass',
    method: 'post',
    data
  })
}
