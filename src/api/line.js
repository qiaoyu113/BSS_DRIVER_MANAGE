import request from '@/utils/request'

export function selectLineTask(data) {
  return request({
    url: '/api/bss/v1/bss/line/task/enterprise-wechat/patcher/selectLineTask',
    method: 'post',
    data
  })
}

export function getLineDetail(data) {
  return request({
    url: '/api/line/line/task/detail',
    method: 'get',
    params: data
  })
}

export function listByLineId(data) {
  return request({
    url: '/api/bss/v1/bss/tender/listByLineId',
    method: 'post',
    data
  })
}

export function loglist(data) {
  return request({
    url: '/api/line/line/task/log/list',
    method: 'get',
    params: data
  })
}

export function getMediaIdOfLineDetail(data) {
  return request({
    url: '/api/line/v1/wechat/corp/getMediaIdOfLineDetail',
    method: 'get',
    params: data
  })
}

/* 二维码 */
export function getWxaCodeUnlimit(data) {
  return request({
    url: '/api/core/v1/wechat/getWxaCodeUnlimit',
    method: 'post',
    data
  })
}

export function helpMatchIntelligent(data) {
  return request({
    url: '/api/bss/v1/bss/corp/helpMatchIntelligent/selectListByKey',
    method: 'post',
    data
  })
}

export function helpMatch(data) {
  return request({
    url: '/api/bss/v1/bss/corp/helpMatch/selectListByKey',
    method: 'post',
    data
  })
}

export function updateState(data) {
  return request({
    url: 'api/match/corp/match/history/save',
    method: 'post',
    data
  })
}

export function getUrlOfLineDetailByLineId(data) {
  return request({
    url: '/api/line/v1/wechat/corp/getUrlOfLineDetailByLineId',
    method: 'get',
    params: data
  })
}

/* 全部线路列表(new) */
export function selectListAll(data) {
  let t = +new Date();
  return request({
    url: `/api/bss/v1/bss/line/task/selectListByConditionsQuery?t=${t}`,
    method: 'post',
    data
  })
}

/* 全部线路列表(new) */
export function searchList(data) {
  let t = +new Date();
  return request({
    url: `/api/bss/v1/bss/line/task/fuzzy/checkNames?t=${t}`,
    method: 'post',
    data
  })
}

// 外线主导
export function getOutside(data) {
  return request({
    url: '/api/bss/v1/bss/match/outline/selectDriverScoreListByQuery',
    method: 'post',
    data
  })
}

