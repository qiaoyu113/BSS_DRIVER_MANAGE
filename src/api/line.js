import request from '@/utils/request'

let prefix = '/mock/32'
// let prefix = '/api/line_center'
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
    url: `${prefix}/v2/line/detail`,
    method: 'get',
    params
  })
}

// 获取线路详情文件
export function getLineDetailFiles(params) {
  return request({
    url: `${prefix}/v2/line/inLineDetail`,
    method: 'get',
    params
  })
}

// 线路下架
export function undercarriage(params) {
  return request({
    url: `${prefix}/v2/line/ativeShelves`,
    method: 'post',
    params
  })
}

// 线路打标签
export function tagging(data) {
  return request({
    url: `${prefix}/v2/line/tagging`,
    method: 'post',
    data
  })
}

// 线路打标签
export function collectLineInfo(data) {
  return request({
    url: `${prefix}/v2/line/inLine`,
    method: 'post',
    data
  })
}

// 发布稳定线路
export function createStableLine(data) {
  return request({
    url: `${prefix}/v2/line/createStableLine`,
    method: 'post',
    data
  })
}

// 发布临时线路
export function createTemporaryLine(data) {
  return request({
    url: `${prefix}/v2/line/createTemporaryLine`,
    method: 'post',
    data
  })
}

// 编辑临时线路
export function editTemporaryLine(data) {
  return request({
    url: `${prefix}/v2/line/editTemporaryLine`,
    method: 'post',
    data
  })
}

// 编辑稳定线路
export function editStableLine(data) {
  return request({
    url: `${prefix}/v2/line/editStableLine`,
    method: 'post',
    data
  })
}

// 复制临时线路
export function copyTemporaryLine(data) {
  return request({
    url: `${prefix}/v2/line/copyTemporaryLine`,
    method: 'post',
    data
  })
}

// 复制稳定线路
export function copyStableLine(data) {
  return request({
    url: `${prefix}/v2/line/copyStableLine`,
    method: 'post',
    data
  })
}

// 激活临时线路
export function activeTemporaryLine(data) {
  return request({
    url: `${prefix}/v2/line/activeTemporaryLine`,
    method: 'post',
    data
  })
}

// 激活稳定线路
export function activeStableLine(data) {
  return request({
    url: `${prefix}/v2/line/activeStableLine`,
    method: 'post',
    data
  })
}

// 判断线路是否能够激活或复制
export function judgeMeetConditions(params) {
  return request({
    url: `${prefix}/v2/line/judgeMeetConditions`,
    method: 'get',
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

