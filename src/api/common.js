import request from '@/utils/request'

/* 上传图片 */
export function upImgData(data) {
  return request({
    url: '/api/base/v1/upload/uploadOSS/img/true/-1',
    method: 'post',
    data
  })
}

/* POST /user/area/getCityAreaByCode
根据父级城市code获取区县子列表 */
export function getCityAreaByCode(data) {
  return request({
    url: '/api/base/user/area/getCityAreaByCode',
    method: 'get',
    params: data
  })
}
/* 获取区 */
export function GetReginByCityCode(data) {
  return request({
    url: '/api/base/user/area/getCityByCode',
    method: 'post',
    data
  })
}
/* 获取乡镇 */
export function getTownByCountryCode(data) {
  return request({
    url: '/api/base/user/area/getTownByCountryCode',
    method: 'get',
    params: data
  })
}
/* 字典 */
export function dictionary(data) {
  return request({
    url: '/api/base/base/dict/qryDictByType',
    method: 'get',
    params: data
  })
}

/* 产品介绍 */
export function productIntroduce(data) {
  return request({
    url: '/api/product/product/enterprise-weChat/patcher/product-introduce',
    method: 'get',
    params: data
  })
}
// 通过token 获取用户信息
export function getUserInfo(data) {
  return request({
    url: '/api/base/user/bss/getUserInfoByToken',
    method: 'get',
    params: data
  })
}
// -------------------------szjw 2.1-----------------------
// 获取开通城市列表
let prefix = '/mock/25'
export function getOpenCitys(params) {
  return request({
    url: `${prefix}/api/base/v1/base/area/getOpenCityData`,
    method: 'get',
    params
  })
}
// 批量查询字典
export function GetDictionaryList(data) {
  return request({
    url: '/api/base/v1/base/dict/dict/list/types',
    method: 'post',
    data
  })
}
