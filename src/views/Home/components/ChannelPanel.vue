<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <p>我的频道</p>
        <van-button
          plain
          @click="isCloseShow = !isCloseShow"
          size="mini"
          type="danger"
          round
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id">
          <div
            class="inner"
            @click="Onclick(index)"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon v-show="isCloseShow" name="close" v-if="index !== 0" />
          </div>
        </van-col>
      </van-row>
      <div class="channel-container">
        <div class="title">
          <p>推荐频道</p>
        </div>
        <van-row>
          <van-col span="6" v-for="item in recommendChannels" :key="item.id">
            <div class="inner van-ellipsis" @click="add(item.id)">
              +{{ item.name }}
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage' // 定义常量，好处是写错的情况code能识别，直接使用字符串不易识别
// const _ = require('lodash')
// import _ from 'lodash'
const CHANNELS = 'CHANNELS'// 导入设置本地存储模块中的设置模块
export default {
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      console.log(res)
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
      // this.commendChannels = _
      // this.recommendChannels = _.differenceBy(res.data.data.channels, this.recommendChannels, 'id')
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      console.log(id)
      const index = this.recommendChannels.findIndex(item => item.id === id)
      console.log(index)
      console.log(this.recommendChannels)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    Onclick (index) {
      if (this.isCloseShow) {
        // 删除
        if (index === 0) return
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换高亮active
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      // 登录过，就把本地持久化放在后台服务器（用ajax） 未登录就放本地存储
      async handler (newVal) {
        console.log(123)
        if (this.$store.state.user && this.$store.state.user.token) { // 登录过的
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log('arr', arr)
          // 先把数据处理一下
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else { // 没有登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true

    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0 16px 0 24px;
    margin-bottom: 16px;
    p {
      font-size: 32px;
      font-weight: 400;
      color: #333333;
    }
    .van-button {
      width: 103px;
      height: 48px;
      border-radius: 20px;
      color: #f85a5a;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    background: #f4f5f6;
    border-radius: 6px;
    text-align: center;
    font-size: 28px;
    font-weight: 400;
    color: #222222;
    line-height: 86px;
    margin-left: 14px;
    position: relative;
    .van-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }
  }
}
.van-col {
  margin-bottom: 22px;
}
</style>
