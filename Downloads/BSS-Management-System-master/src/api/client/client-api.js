import request from '@/utils/request'

/* 创建货主 */
export function creatCustomer(data) {
  return request({
    url: '/api/line/line/customer/save',
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

/* 编辑时获取货主详情 */
export function editClientDetail(data) {
  return request({
    url: '/api/line/line/customer/editInfo',
    method: 'get',
    params: data
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

/* 创建货主 */
export function fetchList(data) {
  return request({
    url: '/api/bss/v1/bss/line/customer/selectListByKey',
    method: 'post',
    data
  })
}

/* 获取货主来源列表 */
export function getSourse(data) {
  return request({
    url: '/api/line/line/customer/source',
    methods: 'get',
    params: data
  })
}

/* 获取开通城市 */
export function getCity(data) {
  return request({
    url: '/api/line/line/customer/onlineCity',
    methods: 'get',
    params: data
  })
}

/* 获取客户池列表 */
export function GetCustomList(data) {
  return request({
    url: '/api/bss/v1/bss/customer/pool/selectListByQuery',
    method: 'post',
    data
  })
}

/* 客户池详情 */
export function customerPoolDetail(data) {
  return request({
    url: '/api/line/line/customer/customerPool/detail',
    methods: 'get',
    params: data
  })
}

/* 获取客户池列表 */
export function customerPoolFollow(data) {
  return request({
    url: '/api/line/line/customer/customerPool/follow',
    method: 'post',
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

/* 客户池创建货主带出信息 */
export function getCustInfo(data) {
  return request({
    url: '/api/line/line/customer/customerPool/create/info',
    methods: 'get',
    params: data
  })
}

/* 客户池日志 */
export function GetCustomLog(data) {
  return request({
    url: '/api/line/line/task/log/customer/clue/log/list',
    methods: 'get',
    params: data
  })
}

// 客户池导出
export function exportExcelCustomList(data) {
  return request({
    url: '/api/bss/v1/bss/customer/pool/list/exporter',
    method: 'POST',
    responseType: 'blob',
    data
  })
}
