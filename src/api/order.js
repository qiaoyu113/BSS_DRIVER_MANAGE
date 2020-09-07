import request from '@/utils/request'
let prefix = '/mock/88'
let productPrefix = '/mock/111'

/**
 * 订单审核
 */
export function auditOrderNoPass(data) {
  return request({
    url: `${prefix}/v2/order/auditOrderNoPass`,
    method: 'post',
    data
  })
}

/**
 * 订单详情
 */
export function orderDetail(data) {
  return request({
    url: `${prefix}/v2/order/getOrderDetialByDriverId`,
    method: 'get',
    params: data
  })
}

/**
 * 订单录入
 */
export function createOrUpdateOrder(data) {
  return request({
    url: `${prefix}/v2/order/createOrUpdateOrder`,
    method: 'post',
    data
  })
}

/**
 * 获取购车供应商
 */
export function GetSupplierByTypeAndCity(data) {
  return request({
    url: `${productPrefix}/v1/product/product/getSupplierByTypeAndCity`,
    method: 'post',
    data
  })
}

/**
 * 获取租车供应商
 */
export function GetRentalCarSupplierByTypeAndCity(data) {
  return request({
    url: `${productPrefix}/v1/product/product/getSupplierByTypeAndCity`,
    method: 'post',
    data
  })
}

/**
 * 购车合作车型
 */
export function GetCarTypeByTypeAndCityAndSupplier(data) {
  return request({
    url: `${productPrefix}/v1/product/product/getCarTypeByTypeAndCityAndSupplier`,
    method: 'post',
    data
  })
}

/**
 * 租车合作车型
 */
export function GetRentalCarTypeByParams(data) {
  return request({
    url: `${productPrefix}/v1/product/product/getRentalCarTypeByParams`,
    method: 'post',
    data
  })
}

/**
 * 获取购车型号
 */
export function GetModelByTypeAndCityAndSupplierAndCarType(data) {
  return request({
    url: `${productPrefix}/v1/product/product/getModelByTypeAndCityAndSupplierAndCarType`,
    method: 'post',
    data
  })
}

/**
 * 租车车价
 */
export function GetPriceAndByTypeAndCityAndSupplierAndCarType(data) {
  return request({
    url: `${productPrefix}/v1/product/product/getPriceAndByTypeAndCityAndSupplierAndCarType`,
    method: 'post',
    data
  })
}

/**
 * GetPriceAndDescribeByTypeAndCityAndSupplierAndCarTypeAndModel
 */
// 购车车价
export function GetPriceAndDescribeByTypeAndCityAndSupplierAndCarTypeAndModel(data) {
  return request({
    url: `${productPrefix}/v1/product/product/PriceAndDescribeByTypeAndCityAndSupplierAndCarTypeAndModel`,
    method: 'post',
    data
  })
}
