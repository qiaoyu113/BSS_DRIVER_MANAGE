import request from '@/utils/request'
let prefix = '/mock/39'
// let prefix = '/api/line_center'
// 获项目列表
export function getProjectList(data) {
  return request({
    url: `${prefix}/v2/line/project/queryProjectQueryList`,
    method: 'post',
    data
  })
}
// 获取项目详情
export function getProjectDetail(params) {
  return request({
    url: `${prefix}/v2/line/project/info`,
    method: 'get',
    params
  })
}

// 项目搜索
export function getProjectSearch(data) {
  return request({
    url: `${prefix}/v2/line/project/fuzzy/check`,
    method: 'post',
    data
  })
}

