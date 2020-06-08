import request from '@/utils/request'

/* 线路列表 */
export function fetchList(data) {
  return request({
    url: '/api/bss/v1/bss/line/task/selectListByKey',
    method: 'post',
    data
  })
}

/* 待审核线路列表 */
export function fetchListWaitApply(data) {
  return request({
    url: '/api/bss/v1/bss/line/task/selectListByQuery/WaitApply',
    method: 'post',
    data
  })
}

/* 全部线路列表 */
export function fetchListAll(data) {
  return request({
    url: '/api/bss/v1/bss/line/task/selectListByQuery/all',
    method: 'post',
    data
  })
}

/* 线路列表 */
export function fetchListCanSell(data) {
  return request({
    url: '/api/bss/v1/bss/line/task/selectListByQuery/canSell',
    method: 'post',
    data
  })
}

/* 新建线路 */
export function getLineData(data) {
  return request({
    url: '/api/bss/v1/bss/CustBuyClue/selectListByKey',
    method: 'get',
    params: data
  })
}

/* 线路详情 */
export function getLineDetail(data) {
  return request({
    url: '/api/line/line/task/detail',
    method: 'get',
    params: data
  })
}

/* 线路货主 */
export function getLineUser(data) {
  return request({
    url: '/api/bss/v1/bss/line/customer/fuzzy/list',
    method: 'get',
    params: data
  })
}

/* 新建线路 */
export function postCreatLine(data) {
  return request({
    url: '/api/line/line/task/create',
    method: 'post',
    data
  })
}

/* 新建集团客户线路 */
export function confirmLineTaskClue(data) {
  return request({
    url: '/api/line/line/task/confirmLineTaskClue',
    method: 'post',
    data
  })
}

/* 编辑线路 */
export function putCreatLine(data) {
  return request({
    url: '/api/line/line/task/edit',
    method: 'post',
    data
  })
}

/* 编辑线路 */
export function putCreatCustomerLine(data) {
  return request({
    url: '/api/line/line/customer/clue/edit',
    method: 'post',
    data
  })
}

/* 线路域 */
export function GetLineTotal(data) {
  return request({
    url: '/api/line/line/task/agg',
    methods: 'get',
    params: data
  })
}

/* 停用线路 */
export function stopStatus(data) {
  return request({
    url: '/api/line/line/task/manuallyDeactivate',
    method: 'post',
    data
  })
}

/* 线路日志 */
export function GetLineLog(data) {
  return request({
    url: '/api/line/line/task/log/list',
    method: 'get',
    params: data
  })
}

/* 新增线路 */
export function AddLine(data) {
  return request({
    url: '/api/line/line/task/manuallyCreateTender',
    method: 'post',
    data
  })
}

/* 获取当前标书列表 */
export function getTenderLine(data) {
  return request({
    url: '/api/match/tender/getTenderListByLineId',
    method: 'get',
    params: data
  })
}

/* 获取当前标书列表 */
export function getTenderTime(data) {
  return request({
    url: '/api/line/line/task/lineDeliveryByLineId',
    method: 'get',
    params: data
  })
}

/* 点击线路按钮下，所有线路数据 */
export function fetchAllList(data) {
  return request({
    url: '/api/bss/v1/bss/line/task/ownLineTasks',
    method: 'post',
    data
  })
}

/* 激活 */
export function activeLineTask(data) {
  return request({
    url: '/api/line/line/task/activeLineTask',
    method: 'post',
    data
  })
}

// 线路总列表导出
export function exportExcelLineList(data) {
  return request({
    url: '/api/bss/v1/bss/line/task/lineTask/exporter',
    method: 'post',
    data
  })
}

// 线索分配
export function customerSave(data) {
  return request({
    url: '/api/line/line/customer/clue/save',
    method: 'post',
    data
  })
}

// 创建线索
export function createLineTaskClue(data) {
  return request({
    url: '/api/line/line/task/createLineTaskClue',
    method: 'post',
    data
  })
}

/* 确认集团客户线路线索时返显数据 */
export function getConfirmClueInfo(data) {
  return request({
    url: '/api/line/line/task/getConfirmClueInfo',
    method: 'get',
    params: data
  })
}

/* 确认集团客户线路线索时返显数据 */
export function customerInfo(data) {
  return request({
    url: '/api/line/line/customer/editInfo',
    method: 'get',
    params: data
  })
}

/* 编辑集团客户货主 */
export function customerEdit(data) {
  return request({
    url: '/api/line/line/customer/clue/edit',
    method: 'post',
    data
  })
}

/* 部分失效线路确认线路可上车数 */
export function confirmLineTaskDeployNum(data) {
  return request({
    url: '/api/line/line/task/confirmLineTaskDeployNum\n',
    method: 'post',
    data
  })
}

/**
 * 线路售罄
 * @param  {object} data
 * @param  {string} data.lineId 线路Id
 */
export function soldOut(data) {
  return request({
    url: '/api/line/line/task/updateSellOut',
    method: 'get',
    params: data
  })
}
