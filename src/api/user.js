import request from '@/utils/request'
import store from '@/store'

/**
 *获取短信验证
 * @param {number} mobile
 * @returns返回的是promise
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `sms/codes/${mobile}`
  })
}
/**
 *1
 * @param {mobile,code} param0
 * @returns promise
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}
/**
 *获取用户个人资料
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: 'user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
