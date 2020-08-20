import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'api/bss/v1/bss/driver/clue/selectListByKey',
    method: 'post',
    data
  })
}
