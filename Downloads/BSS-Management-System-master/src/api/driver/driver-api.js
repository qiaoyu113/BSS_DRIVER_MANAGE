import request from '@/utils/request'

/* 司机列表 */
export function GetDriverList(data) {
  return request({
    url: '/api/bss/v1/bss/driver/selectListByKey',
    method: 'post',
    data
  })
}

/* 新建司机 */
export function addDriver(data) {
  return request({
    url: '/api/driver/driver/creation',
    method: 'post',
    data
  })
}

/* 编辑司机 */
export function editDriver(data) {
  return request({
    url: '/api/driver/driver/creationUpdate',
    method: 'post',
    data
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

/* 获取司机线路标书信息 */
export function GetDriverTenderDetail(data) {
  return request({
    url: '/api/match/tender/lineTenderDetail',
    method: 'get',
    params: data
  })
}

/* 征信标记 */
export function offLineChecks(data) {
  return request({
    url: '/api/driver/driver/creditMarking',
    method: 'post',
    data
  })
}

/* 司机收入信息 */
export function getInCome(data) {
  return request({
    url: '/api/driver/driver/income/expenseIncome',
    method: 'post',
    params: data
  })
}

/* 司机收入日历 */
export function getInComeCalendar(data) {
  return request({
    url: '/api/driver/driver/income/calendar',
    method: 'post',
    data
  })
}

/* 司机监控列表 */
export function GetDriverMonitoring(data) {
  return request({
    url: '/api/bss/v1/bss/driver/monitor/selectListByKey',
    method: 'post',
    data
  })
}

/* 司机编号，上岗时间变更 */
export function updateYunNiaoDriverIdOrDay(data) {
  return request({
    url: '/api/driver/driver/income/updateYunNiaoDriverIdOrDay10',
    method: 'post',
    data
  })
}

/* 司机金数据其他信息 */
export function getOtherInfo(data) {
  return request({
    url: '/api/driver/driver/otherInfo',
    method: 'get',
    params: data
  })
}

/* 司机金数据其他信息 */
export function getAssessInfo(data) {
  return request({
    url: '/api/driver/driver/assessmentInfo',
    method: 'get',
    params: data
  })
}

/* 司机列表导出 */
export function exportExcelList(data) {
  return request({
    url: '/api/driver/driver/moniter/exportExcelList',
    method: 'get',
    responseType: 'blob',
    params: data
  })
}

/* 司机详情导出 */
export function exportExcelDetail(data) {
  return request({
    url: '/api/driver/driver/moniter/exportExcelDetail',
    method: 'get',
    responseType: 'blob',
    params: data
  })
}

/* 司机相关线路信息 */
export function relatedLineInformation(data) {
  return request({
    url: '/api/driver/driver/relatedLineInformation',
    method: 'get',
    params: data
  })
}

/* 司机变更收入查询 v1.10 */
export function driverChangeIncomeQuery(data) {
  return request({
    url: '/api/driver/driver/income/driverChangeIncomeQuery',
    method: 'post',
    data
  })
}

/* 司机变更收入修改 v1.10 */
export function driverChangeIncomeUpdate(data) {
  return request({
    url: '/api/driver/driver/income/driverChangeIncomeUpdate',
    method: 'post',
    data
  })
}

/* 司机云鸟编号，上岗时间信息追加 v1.10 */
export function addYunNiaoDriverIdOrDay10(data) {
  return request({
    url: '/api/driver/driver/income/addYunNiaoDriverIdOrDay10',
    method: 'post',
    data
  })
}

/* 司机变更收入修改 v1.10 */
export function updateYunNiaoDriverIdOrDay10(data) {
  return request({
    url: '/api/driver/driver/income/updateYunNiaoDriverIdOrDay10',
    method: 'post',
    data
  })
}

/* 司机云鸟编号，上岗时间信息停用 v1.10 */
export function stopYunNiaoDriverIdOrDay10(data) {
  return request({
    url: '/api/driver/driver/income/stopYunNiaoDriverIdOrDay10',
    method: 'post',
    data
  })
}

/* 司机反馈信息 */
export function feedbackAll(data) {
  return request({
    url: '/api/bss/v1/bss/driver/feedback-issue/selectListByQuery/all',
    method: 'post',
    data
  })
}

/* 司机反馈信息 */
export function feedbackSolved(data) {
  return request({
    url: '/api/bss/v1/bss/driver/feedback-issue/selectListByQuery/solved',
    method: 'post',
    data
  })
}

/* 司机反馈信息 */
export function feedbackUnprocessed(data) {
  return request({
    url: '/api/bss/v1/bss/driver/feedback-issue/selectListByQuery/unprocessed',
    method: 'post',
    data
  })
}

/* 司机反馈信息 */
export function feedbackUnsolved(data) {
  return request({
    url: '/api/bss/v1/bss/driver/feedback-issue/selectListByQuery/unsolved',
    method: 'post',
    data
  })
}

/* 司机反馈详情 */
export function feedbackDetail(data) {
  return request({
    url: '/api/driver/driver/xcx/driver-feedback-issue-info-detail',
    method: 'get',
    params: data
  })
}

/* 导出司机画像 */
export function exportDriverPortrait(data) {
  return request({
    url: '/api/driver/driver/exportDriverPortrait',
    method: 'post',
    data
  })
}

/* 导出司机画像 */
export function theDriverRevisitedTheInterviewTime(data) {
  return request({
    url: '/api/driver/driver/theDriverRevisitedTheInterviewTime',
    method: 'post',
    data
  })
}

/* 司机外线收入 */
export function fetchListOut(data) {
  return request({
    url: '/api/driver/driver/income/outsideIncomeList',
    method: 'post',
    data
  })
}

/* 司机外线收入单个线路详情列表 */
export function fetchListRecord(data) {
  return request({
    url: '/api/driver/driver/income/outsideIncomeDetail',
    method: 'post',
    data
  })
}

/* 司机外线变更收入 */
export function changePriceChecks(data) {
  return request({
    url: '/api/driver/driver/income/driverIncomeChange',
    method: 'post',
    data
  })
}

/* 司机考勤管理列表 */
export function driverAttendanceManagementList(data) {
  return request({
    url: '/api/driver/driver/income/driverAttendanceManagementList',
    method: 'post',
    data
  })
}

/* 司机考勤管理操作 */
export function driverAttendanceManagementChange(data) {
  return request({
    url: '/api/driver/driver/income/driverAttendanceManagementChange',
    method: 'post',
    data
  })
}

/* 司机提报详情 */
export function oneDayOutsideReportDetails(data) {
  return request({
    url: '/api/driver/driver/income/oneDayOutsideReportDetails',
    method: 'post',
    data
  })
}

export function GetDriverFreightList(data) {
  return request({
    url: 'api/bss/bss/driver/dispatch/selectListByKey',
    method: 'post',
    data
  })
}

export function changFreight(data) {
  return request({
    url: 'api/dispatch/driver/dispatch/bss/change_record',
    method: 'post',
    data
  })
}
