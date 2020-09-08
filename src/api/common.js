import request from '@/utils/request'

/* 上传图片 */
export function upImgData(data) {
  return request({
    url: '/base/v1/upload/uploadOSS/img/true/-1',
    method: 'post',
    data
  })
}

/* POST /user/area/getCityAreaByCode
根据父级城市code获取区县子列表 */
export function getCityAreaByCode(data) {
  return request({
    url: '/base/user/area/getCityAreaByCode',
    method: 'get',
    params: data
  })
}
/* 获取区 */
export function GetReginByCityCode(data) {
  return request({
    url: '/base/user/area/getCityByCode',
    method: 'post',
    data
  })
}
/* 获取乡镇 */
export function getTownByCountryCode(data) {
  return request({
    url: '/base/user/area/getTownByCountryCode',
    method: 'get',
    params: data
  })
}
/* 字典 */
export function dictionary(data) {
  return request({
    url: '/base/base/dict/qryDictByType',
    method: 'get',
    params: data
  })
}

/* 产品介绍 */
export function productIntroduce(data) {
  return request({
    url: '/product/product/enterprise-weChat/patcher/product-introduce',
    method: 'get',
    params: data
  })
}
// 通过token 获取用户信息
export function getUserInfo(data) {
  return request({
    url: '/base/user/bss/getUserInfoByToken',
    method: 'get',
    params: data
  })
}
// -------------------------szjw 2.1-----------------------
// 获取开通城市列表
// let prefix = '/mock/25'
// let corePrefix = '/mock/25'
let corePrefix = '/api/core'
let prefix = '/api/base'

export function getOpenCitys(params) {
  return request({
    url: `${prefix}/v1/base/area/getOpenCityData`,
    method: 'get',
    params
  })
}

// 上传文件
export function upload(params, data) {
  return request({
    url: `${corePrefix}/v1/upload/uploadOSS/${params.folder}/${params.isEncode}/${params.expire}`,
    method: 'post',
    data
  })
}

// 根据类型查询字典值--不分页
export function getDictData(params) {
  return request({
    url: `${prefix}/v1/base/dict/dictData/list`,
    method: 'get',
    params
  })
}

// 根据类型查询字典值--不分页
export function getDictDataByKeyword(data) {
  return request({
    url: `${prefix}/v1/base/dict/getDictInfoByDictTypeAndKeyword`,
    method: 'post',
    data
  })
}
// 批量查询字典
export function GetDictionaryList(data) {
  return request({
    url: `${prefix}/v1/base/dict/dict/list/types`,
    method: 'post',
    data
  })
}

// 获取省、市、县
export const GetCityByCode = (data) =>
  request({
    url: `${prefix}/v1/base/area/getCityByCode`,
    // url: '/base/v1/base/area/getCityByCode',
    method: 'post',
    data
  })

// 加盟经理(1)  外销销售(2) 上岗经理(3)
export const GetSpecifiedRoleList = (data) =>
  request({
    url: `${prefix}/v1/base/role/getSpecifiedRoleList`,
    method: 'post',
    data
  })

// 查询当前用户组织下的城市列表或者所归属的城市 工作城市
export function getCurrentLowerOfficeCityData(params) {
  return request({
    url: `${prefix}/v1/base/office/getCurrentLowerOfficeCityData`,
    method: 'get',
    params
  })
}
