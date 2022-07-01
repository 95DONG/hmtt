// 为了方便项目中使用本地存储的时候写的时候简化操作， 封装 获取 设置 删除 全部删除工具函数
// window.localStorage.getItem（'a',"['a']"）单引号解析不了，会报错，所以只能直接输出，不能转换
/**
 *获取
 * @param {token值} key
 * @returns
 */
export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (error) {
    return res
  }
}

/**
 *设置
 * @param {token名} key
 * @param {token值} value
 */
export function setItem (key, value) {
  if (typeof value === 'object') { // 复合数据类型
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}

/**
 *根据key删除本地存储中的一项
 * @param {要删除的key} key
 */
export function removeItem (key) {
  window.localStorage.removeItem(key)
}

/**
 * 删除所有的本地存储
 */
export function clearItem () {
  window.localStorage.clearItem()
}
