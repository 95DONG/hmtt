<template>
  <div>
    <van-nav-bar fixed>
      <template #title>
        <van-button round type="info" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPanelShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      duration="0.25"
      :style="{ height: '100%', paddingTop: '1rem' }"
      ><ChannelPanel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from './components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
export default {

  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    async getMyChannels () {
      try {
        const res = await getMyChannels()
        console.log('res', res)
        this.channels = res.data.data.channels
        console.log(this.channels)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  // opacity: 0.2;
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  // background-color: #3296fa;
  width: 31px;
  // height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 82px;
  position: fixed;
  right: 0;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh{
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
