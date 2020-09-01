import request from '@/utils/request'
let prefix = '/mock/74'
// 创建试跑
export function CreateLntentionRun(data) {
  return request({
    url: `${prefix}/v2/runtest/creatIntentionRun`,
    method: 'post',
    data
  })
}
// 试跑列表
export function GetRunTestInfoList(data) {
  return request({
    url: `${prefix}/v2/runtest/getRunTestInfoList`,
    method: 'post',
    data
  })
}
