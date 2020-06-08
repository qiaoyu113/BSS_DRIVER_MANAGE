import request from '@/utils/request'

/* gmv导入 */
export function fileUpload(data) {
  return request({
    url: '/api/line/line/gmv/importFile',
    method: 'post',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
/* 审核GMV导入 */
export function fileUpload2(data) {
  return request({
    url: '/api/line/line/gmv/importFileExamine',
    method: 'post',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
/* 城市导出 */
export function fileDownCity(params) {
  return request({
    url: '/api/line/line/gmv/getDownloadExcelFromCity',
    method: 'get',
    responseType: 'blob',
    params
  })
}
/* 专车纵线导出 */
export function fileDownProfessional(params) {
  return request({
    url: '/api/line/line/gmv/getDownloadExcelFromSpecial',
    method: 'get',
    responseType: 'blob',
    params
  })
}
/* 共享纵线导出 */
export function fileDownShare(params) {
  return request({
    url: '/api/line/line/gmv/getDownloadExcelFromShare',
    method: 'get',
    responseType: 'blob',
    params
  })
}
/* 外线纵线导出 */
export function fileDownOutside(params) {
  return request({
    url: '/api/line/line/gmv/getDownloadExcelFromExternal',
    method: 'get',
    responseType: 'blob',
    params
  })
}
/* 自承运纵线导出 */
export function fileDownSelf(params) {
  return request({
    url: '/api/line/line/gmv/getDownloadExcelFromSelfCarrying',
    method: 'get',
    responseType: 'blob',
    params
  })
}
/* 合伙承运纵线导出 */
export function fileDownPartner(params) {
  return request({
    url: '/api/line/line/gmv/getDownloadExcelFromPartnerShip',
    method: 'get',
    responseType: 'blob',
    params
  })
}
