import request from '@/utils/request'

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
 *
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
