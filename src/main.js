import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
// 引入全部样式
import 'vant/lib/index.less'
import 'amfe-flexible'
import MyIcon from '@/components/MyIcon.vue'
// import '@/styles/icon.less'
// import '@/styles/reset.less'
import '@/styles/index.less'
import * as obj from '@/filters/index'// 一次性把filters/index 里面的所有按需导出全部导出放到obj中作为属性
import FollowUser from '@/components/FollowUser.vue'
// 引入全局注册组件的js文件
import '@/components'
// Object.keys(obj) 把对象中的属性名提取出来并存放到数组中
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.config.productionTip = false
Vue.component('MyIcon', MyIcon)
Vue.use(Vant)
// 全局注册FollowUser
Vue.component(FollowUser.name, FollowUser)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// setTimeout(() => {
//   // 给页面上所有的元素绑定滚动事件
//   //  只要谁滚动 就打印出来
//   const list = document.querySelectorAll('*')
//   list.forEach(item => {
//     item.onscroll = function (e) {
//       // console.log(e.target)
//     }
//   })
// }, 1000)
