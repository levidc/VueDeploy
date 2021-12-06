import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
export function saveAccount(account) {
  return Cookies.set('account-save', account)
}
export function getAccount() {
  return Cookies.get('account-save')
}
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function testCookie() {
  return Cookies.set('test', '123', { expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) })
}
export function getCookie() {
  return Cookies.get('test')
}
export default Cookies
