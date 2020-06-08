import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/auth/bss/getToken',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/user/info',
    method: 'get',
    params: data
  })
}

/* 动态路由获取 */
export function GetUserRouter(data) {
  return request({
    url: '/api/repair/author/getMenus',
    method: 'post',
    params: data
  })
}

