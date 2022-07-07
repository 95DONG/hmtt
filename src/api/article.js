import request from '@/utils/request'
/**
 *根据ID查文章
 * @param {文章id} article_id
 * @returns
 */
export const getArticle = (article_id) => {
  return request({
    url: `articles/${article_id}`
  })
}
/**
 *添加用户名
 * @param {用户id} target
 * @returns
 */
export const AddUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}

/**
 *取消用户
 * @param {用户id} target
 * @returns
 */
export const DelUser = (target) => {
  return request({
    method: 'DELETE',
    url: `user/followings/${target}`
  })
}

/**
 *点击收藏
 * @param {要收藏的文章id} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}

/**
 *取消收藏
 * @param {收藏的目标文章id} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
