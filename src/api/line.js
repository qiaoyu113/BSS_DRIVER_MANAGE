import request from '@/utils/request'

let prefix = '/mock/32'
// 获取线路列表
export function getLineList(data) {
  return request({
    url: `${prefix}/v1/line/lineInfo/queryLineListByConditionsQuery`,
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

