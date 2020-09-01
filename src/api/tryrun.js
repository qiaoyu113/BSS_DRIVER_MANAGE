import request from '@/utils/request'

export function selectLineTask(data) {
  return request({
    url: '/api/v2/runtest/creatIntentionRun',
    method: 'post',
    data
  })
}
