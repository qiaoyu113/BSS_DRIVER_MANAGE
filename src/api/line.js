import request from '@/utils/request'

// let prefix = '/mock/32'
let prefix = '/api/line_center'
// 获取线路列表
export function getLineList(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/queryLineListByConditionsQuery`,
    method: 'post',
    data
  })
}
// 获取线路详情
export function getLineDetail(params) {
  return request({
    url: `${prefix}/v2/line/lineInfo/detail`,
    method: 'get',
    params
  })
}

// 线路下架
export function undercarriage(params) {
  return request({
    url: `${prefix}/v2/line/lineInfo/shelveLine`,
    method: 'post',
    params
  })
}

// 线路打标签
export function tagging(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/tagging`,
    method: 'post',
    data
  })
}

// 采线
export function collectLineInfo(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/saveInLine`,
    method: 'post',
    data
  })
}

// 发布稳定线路
export function createStableLine(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/createStableLine`,
    method: 'post',
    data
  })
}

// 发布临时线路
export function createTemporaryLine(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/createTemporaryLine`,
    method: 'post',
    data
  })
}

// 编辑临时线路
export function editTemporaryLine(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/editTemporaryLine`,
    method: 'post',
    data
  })
}

// 编辑稳定线路
export function editStableLine(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/editStableLine`,
    method: 'post',
    data
  })
}

// 复制临时线路
export function copyTemporaryLine(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/copyTemporaryLine`,
    method: 'post',
    data
  })
}

// 复制稳定线路
export function copyStableLine(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/copyStableLine`,
    method: 'post',
    data
  })
}

// 激活临时线路
export function activeTemporaryLine(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/activeTemporaryLine`,
    method: 'post',
    data
  })
}

// 激活稳定线路
export function activeStableLine(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/activeStableLine`,
    method: 'post',
    data
  })
}

// 判断线路是否能够激活或复制
export function judgeMeetConditions(params) {
  return request({
    url: `${prefix}/v2/line/lineInfo/judgeMeetConditions`,
    method: 'post',
    params
  })
}

// 线路搜索
export function getLineSearch(data) {
  return request({
    url: `${prefix}/v2/line/lineInfo/fuzzyCheck`,
    method: 'post',
    data
  })
}

