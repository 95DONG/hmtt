import dayjs from 'dayjs'// 安装dayjs yarn add dayjs 并引入
import 'dayjs/locale/zh-cn' // 引入中国时区
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')// 把默认英语改成中文
dayjs.extend(relativeTime)

/**
 *把时间变为相对时间
 dayjs体积相对moment.js 要小一点
 * @param {*} time
 * @returns
 */
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}
