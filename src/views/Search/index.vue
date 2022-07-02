<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.go(-1)"
        @search="onSearch"
        @focus="isSearch = false"
        autofocus
      />
    </form>
    <!-- 判断显示的页面，为空显示历史记录  输入数据显示建议  回车显示结果 -->
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <!-- 父向子传值 传入搜索输入的内容 -->
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false// 默认没有回车
    }
  },
  methods: {
    onSearch (item) {
      this.searchText = item
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', item)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest
  }
}
</script>

<style scoped lang='less'>
</style>
