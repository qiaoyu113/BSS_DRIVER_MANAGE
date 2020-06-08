// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Permission = 'Permission'

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function setPermission(permission) {
  return localStorage.setItem(Permission, permission)
}
