import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
// 把数据存储到本地
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setSearchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchHistoryList = arr
    },
    // 删除所有
    delAllHistory (state) {
      state.searchHistoryList = []
    },
    // 删除一个，根据索引删除
    delHistory (state, index) {
      state.searchHistoryList.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
