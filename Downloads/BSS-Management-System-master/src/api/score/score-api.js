import request from '@/utils/request'

/* 查询统计月份 */
export function getMonthList(params) {
  return request({
    url: '/api/datacenter/help/city/item/exam',
    method: 'get',
    params
  })
}
/* 开始答题 */
export function startScore(data) {
  return request({
    url: '/api/datacenter/help/city/item/clock',
    method: 'post',
    data
  })
}
/* 获取时间 */
export function getClock() {
  return request({
    url: '/api/datacenter/help/city/item/clock',
    method: 'get'
  })
}
/* 全景视角---赋能项统计数据 */
export function getRecords(data) {
  return request({
    url: '/api/datacenter/help/city/static/records',
    method: 'post',
    data
  })
}
/* 城市视角---赋能项统计数据 */
export function getCityRecords(data) {
  return request({
    url: '/api/datacenter/help/city/static/city/records',
    method: 'post',
    data
  })
}
/* 赋能视角---赋能项统计数据 */
export function getEmpowerment(data) {
  return request({
    url: '/api/datacenter/help/city/static/empowerment/records',
    method: 'post',
    data
  })
}
/* 获取职务 */
export function getTitleList() {
  return request({
    url: '/api/datacenter/help/city/item/title/list',
    method: 'get'
  })
}
/* 获取职务 */
export function getItemList() {
  return request({
    url: '/api/datacenter/help/city/item/item/list',
    method: 'get'
  })
}
