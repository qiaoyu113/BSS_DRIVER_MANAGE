import request from '@/utils/request'

/**
 * 获取货主列表
 * @param {*} data
 */
export function fetchList(data) {
  return request({
    url: '/api/bss/v1/bss/line/customer/selectListByKey',
    method: 'post',
    data
  })
}

/* 获取货主详情 */
export function getClientDetail(data) {
  return request({
    url: '/api/line/line/customer/info',
    method: 'get',
    params: data
  })
}

/* 获取开通城市 */
export function getCity(data) {
  return request({
    url: '/api/line/line/customer/onlineCity',
    method: 'get',
    params: data
  })
}

/**
 * 上传营业执照
 */
export function uploadFile(data) {
  return request({
    url: '/api/base/v1/upload/uploadOSS/img/true/-1',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

/* 客户来源一级二级 */
export function getLineCustomerOneOrTwoCategory(data) {
  return request({
    url: '/api/line/line/customer/getLineCustomerOneOrTwoCategory',
    methods: 'get',
    params: data
  })
}

/* 创建货主 */
export function creatCustomer(data) {
  return request({
    url: '/api/line/line/customer/save',
    method: 'post',
    data
  })
}

/* 编辑货主 */
export function editCustomer(data) {
  return request({
    url: '/api/line/line/customer/edit',
    method: 'post',
    data
  })
}
/* 编辑时获取货主详情 */
export function editClientDetail(data) {
  return request({
    url: '/api/line/line/customer/editInfo',
    method: 'get',
    params: data
  })
}

/* 编辑时获取货主详情 */
export function searchCustomerByKeyword(data) {
  return request({
    url: '/api/bss/v1/bss/line/customer/fuzzy/checkNames',
    method: 'post',
    data
  })
}

/* 获取当前用户销售线路 */
export function getSaleLine() {
  return request({
    url: '/api/base/user/bss/getLineSaleUserManager',
    method: 'get'

  })
}
