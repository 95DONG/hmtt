<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <articleItem v-for="(item, index) in list" :key="index" :article="item">
        </articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getSearchResult } from '@/api/search'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1, // 显示的页数，第几页
      per_page: 20, // 每页显示的数量
      list: [], // 准备一个空数组存放获取回来的数据
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 将获取回来的数据放到准备好的数组里,每次都把数据追加到尾部
        this.list.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      // 每次到底部页码加一，请求下一页数据
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
