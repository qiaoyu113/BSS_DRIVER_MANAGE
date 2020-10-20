import request from '@/utils/request'
// let prefix = '/mock/88'
const prefix = '/business_center'
// const productPrefix = '/mock/111'
const productPrefix = '/product'

const orderPrefix = '/order'

const billPrefix = '/bill'

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
 * 订单列表
 */
export function getOrderList(data) {
  return request({
    url: `${prefix}/v2/order/getOrderListByDriverId`,
    method: 'get',
    params: data
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
 * 合同列表
 */
export function contractList(data) {
  return request({
    url: `${prefix}/v2/contract/contractList`,
    method: 'get',
    params: data
  })
}

/**
 * 合同激活
 */
export function activeContract(data) {
  return request({
    url: `${prefix}/v2/contract/activeContract`,
    method: 'get',
    params: data,
    timeout: 10000
  })
}

/**
 * 订单终止
 */
export function orderAbort(data) {
  return request({
    url: `${orderPrefix}/v2/order/abort`,
    method: 'post',
    data
  })
}

/**
 * 订单支付时,可提现余额校验
 */
export function checkWithdrawable(data) {
  return request({
    url: `${orderPrefix}/v2/order/checkWithdrawable`,
    method: 'get',
    params: data
  })
}

/**
 * 订单支付时,可提现余额校验是否大于0
 */
export function getCanExtractByUserId(data) {
  return request({
    url: `${billPrefix}/v2/wt-driver-account/management/getCanExtractByUserId`,
    method: 'post',
    params: data
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
