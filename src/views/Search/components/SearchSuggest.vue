<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #title>
        <span v-html="lighthigh(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'// 按需导入接口地址，在watch里使用
// 响应式数据写在data里面，非响应式写在export default 上面。这样性能高一点
let timer = null// 定义全局的定时器名称 全局变量
export default {
  name: 'suggest',
  // 1.接收父级传过来的数据 1.1 通过watch 监听事件，发送ajax请求
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      list: []// 准备一个空数组，接收传回来的数组
    }
  },
  methods: {
    // 因为这块要渲染的不是普通的字符串，而是html片段，所以必须要用v-html v-html是属性绑定 ，所以不能用过滤器
    // 所以只能在methods 中写
    lighthigh (value) {
      // 定义正则
      const reg = new RegExp(this.searchText, 'g')
      // 使用正则替换
      return value.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    // 1.1创建监听事件
    searchText: {
      handler (newVal) {
        clearTimeout(timer)// 每次调用前都清空一下之前的定时器
        timer = setTimeout(async () => { // async await 必须属于同一个函数
          try {
            console.log(newVal)
            const res = await getSuggestList(newVal)// 调用按需导入的接口函数
            // console.log(res)
            this.list = res.data.data.options
            console.log(this.list)
          } catch (error) {
            console.log(error)
          }
        }, 900)
      },
      immediate: true // 立即监听 组件在创建的时候就会监听一次，如果不写，第一次就不会监听
    }
  },
  // 组件被销毁了，要清理掉定时器，避免内存泄漏
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
