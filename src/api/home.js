import request from '@/utils/request'

/**
 *我的频道
 * @returns
 */
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

/**
 *获取文章列表
 * @param {要传的参数} params
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: { channel_id, timestamp }
  })
}

export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}
