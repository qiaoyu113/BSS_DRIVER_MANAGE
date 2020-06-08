import request from '@/utils/request'

/* 订单列表 */
export function GetOrderList(data) {
  return request({
    url: '/api/bss/v1/bss/order/selectListByKey',
    method: 'post',
    data
  })
}

/* 待成交订单列表 */
export function GetOrderListNotyet(data) {
  return request({
    url: '/api/bss/v1/bss/order/selectListByQuery/notyet',
    method: 'post',
    data
  })
}

/* 待总部确认订单列表 */
export function GetOrderListReject(data) {
  return request({
    url: '/api/bss/v1/bss/order/selectListByQuery/toConfirm',
    method: 'post',
    data
  })
}

/* 已成交订单列表 */
export function GetOrderListDeal(data) {
  return request({
    url: '/api/bss/v1/bss/order/selectListByQuery/haveDeal',
    method: 'post',
    data
  })
}

/* 线路标书信息 */
export function GetLineTender(data) {
  return request({
    url: '/api/match/tender/signLineTenderDetail',
    method: 'get',
    params: data
  })
}

/* 获取司机详情 */
export function GetDriver(data) {
  return request({
    // url: '/api/driver/driver/detail',
    url: '/api/order/orderManager/orderDetail',
    method: 'get',
    params: data
  })
}

/* 获取司机详情 */
export function GetDriverDetail(data) {
  return request({
    url: '/api/driver/driver/detail',
    method: 'get',
    params: data
  })
}

/* 获取产品列表 */
export function GetProduct(data) {
  return request({
    url: '/api/product/product/productProgramList',
    method: 'post',
    data
  })
}

/* 获取产品详情 */
export function getProductDetail(data) {
  return request({
    url: '/api/product/product/productProgramDetail',
    method: 'get',
    params: data
  })
}

/* 获取订单产品详情 */
export function getProductDetails(data) {
  return request({
    url: '/api/order/order/detail',
    method: 'post',
    params: data
  })
}

/* 提交 */
export function postSigning(data) {
  return request({
    // url: '/api/order/order/confirmContract',
    url: '/api/order/orderManager/createNewOrder',
    method: 'post',
    data
  })
}

/* 订单管理 */
export function creatDelivery(data) {
  return request({
    url: '/api/order/order/carDelivery',
    method: 'post',
    data
  })
}

/* 订单上岗 */
export function goToWork(data) {
  return request({
    url: '/api/order/order/goToWork',
    method: 'post',
    data
  })
}

/* 加跑线路标书 */
export function goToWorkAdd(data) {
  return request({
    url: '/api/order/order/goToWorkRun',
    method: 'post',
    data
  })
}

/* 车辆交付信息 */
export function GetQueryCar(data) {
  return request({
    url: '/api/order/order/queryCarDelivery',
    method: 'post',
    data
  })
}

/* 根据司机id查询当前司机的所有标书，为 order工程提供 */
export function GetTenderList(data) {
  return request({
    url: '/api/match/tender/getTenderListByDriverId',
    method: 'get',
    params: data
  })
}

/* 订单上岗前司机列表 */
export function getTenderForOrderDuty(data) {
  return request({
    // url: '/api/bss/v1/bss/tender/getTenderForOrderDuty',
    url: '/api/bss/v1/bss/tender/listForOrderDuty',
    method: 'post',
    data
  })
}

/* 签约确认操作 */
export function orderConfirm(data) {
  return request({
    url: '/api/order/order/orderConfirm',
    method: 'post',
    data
  })
}

/* 订单列表，进行上岗前 判断 */
export function beforeGotowork(data) {
  return request({
    url: '/api/order/order/beforeGoToWork',
    method: 'get',
    params: data
  })
}

export function queryDriverInfo(data) {
  return request({
    url: '/api/proxy/proxy/a/queryDriverInfo',
    method: 'post',
    data
  })
}

/* 获取金融服务商 */
export function GetFinancialList(data) {
  return request({
    url: '/api/product/product/productFinancialProviders',
    method: 'get',
    params: data
  })
}

/* 获取金融服务商详情 */
export function GetFinancialDetail(data) {
  return request({
    url: '/api/product/product/productFinancialProvidersDetail',
    method: 'get',
    params: data
  })
}

/* 获取金融服务商分期期数 */
export function GetFinancialProvidersStaging(data) {
  return request({
    url: '/api/product/product/productFinancialProvidersStaging',
    method: 'get',
    params: data
  })
}

/* 司机拥有的订单列表 */
export function QueryOrdersByDriverId(data) {
  return request({
    url: '/api/driver/driver/queryOrdersByDriverId',
    method: 'get',
    params: data
  })
}

/* 司机查询银行卡信息 */
export function queryDriverBankCards(data) {
  return request({
    url: '/api/driver/driver/queryDriverBankCards',
    method: 'post',
    data
  })
}

/* 司机修改银行卡信息 */
export function updateDriverBankCards(data) {
  return request({
    url: '/api/driver/driver/updateDriverBankCards\n',
    method: 'post',
    data
  })
}

/* 司机拥有的订单列表 */
export function orderDelete(data) {
  return request({
    url: '/api/order/orderManager/orderDelete',
    method: 'get',
    params: data
  })
}

/* 已成交订单导出 */
export function exportExcelOrderList(data) {
  return request({
    url: '/api/order/orderManager/orderExport',
    method: 'get',
    responseType: 'blob',
    params: data
  })
}

/* 司机拥有的订单列表 */
export function GetOrderListDelet(data) {
  return request({
    url: '/api/bss/v1/bss/order/selectListByQuery/delete\n',
    method: 'post',
    data
  })
}

/* 司机拥有的订单列表 */
export function changeTheDateOfTheTransaction(data) {
  return request({
    url: '/api/order/orderManager/changeTheDateOfTheTransaction',
    method: 'post',
    data
  })
}

/* 租车车型 */
export function carRentalModelSelection(data) {
  return request({
    url: '/api/product/product/choice/carRentalModelSelection',
    method: 'post',
    data
  })
}

/* 租车公司 */
export function rentalCompaniesSelection(data) {
  return request({
    url: '/api/product/product/choice/rentalCompaniesSelection',
    method: 'post',
    data
  })
}

/* 带车车型 */
export function withCarModelSelection(data) {
  return request({
    url: '/api/product/product/choice/withCarModelSelection',
    method: 'post',
    data
  })
}

/* 退款详情 */
export function getOrderRefundDetail(data) {
  return request({
    url: 'api/order/v1/order/refundApply/detail',
    method: 'get',
    params: data
  })
}

/* 通过退款 */
export function refundOrderConfirm(data) {
  return request({
    url: '/api/order/v1/order/refundApply/orderRefundApplyVerify',
    method: 'post',
    data
  })
}

/* 通过退款 */
export function refundApply(data) {
  return request({
    url: '/api/bss/v1/order/refundApply/selectListByKey',
    method: 'post',
    data
  })
}
