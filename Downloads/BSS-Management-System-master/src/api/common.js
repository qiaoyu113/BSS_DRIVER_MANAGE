import request from '@/utils/request'

/* 上传图片 */
export function upImgData(data) {
  return request({
    url: '/api/base/v1/upload/uploadOSS/img/true/-1',
    method: 'post',
    data
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

/* 获取区 */
export function GetReginByCityCode(data) {
  return request({
    url: '/api/base/user/area/getCityByCode',
    method: 'post',
    data
  })
}

/* 获取市 */
export function GetProvince(data) {
  return request({
    url: '/api/base/user/area/province',
    method: 'get',
    params: data
  })
}

/* 获取省 */
export function GetCity(data) {
  return request({
    url: '/api/base/user/area/city',
    method: 'get',
    params: data
  })
}

// 线索跟进是获取
export function getFollowClueUserInfo(data) {
  return request({
    url: '/api/base/user/bss/getFollowClueUserInfo',
    method: 'get',
    params: data
  })
}

// 查询下载列表
export function getExportDownRecord(data) {
  return request({
    url: '/api/core/v1/core/exportDownRecord/selectByUserId',
    method: 'post',
    data
  })
}
