<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replay-show="$emit('replay-show', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import { getCommentsList } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    type: { // 接收传过来的类型
      type: String,
      required: true,
      // 自定义校验规则
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    source: { // 接收传过来的id数据
      type: [Number, String],
      required: true
    },
    commentList: {
      type: Array,
      required: true
    }
  },
  created () {
    this.getCommentsList()// 调用获取评论列表函数
  },
  data () {
    return {
      // 存放参数
      paramsobj: {
        limit: 5,
        offset: null,
        source: this.source,
        type: this.type
      },
      // commentList: [], // 存放评论数据
      loading: false,
      finished: false
    }
  },
  methods: {
    // 获取评论列表
    async getCommentsList () {
      try {
        const res = await getCommentsList(this.paramsobj)
        if (res.data.data.results.length === 0) {
          // 数据全部加载完毕，则直接将finished 设置成true 即可
          this.finished = true
        }
        // 通过子传父$emit()把数据传递到父级，用来渲染，通过$event接收
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)// 将下一页的数据添加到数组里
        // 本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为null
        this.paramsobj.offset = res.data.data.last_id
        this.loading = false // 每次当前页面数据拿回来了，就把loading转圈效果关闭
        // console.log(11, res)
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      // console.log(123)
      this.getCommentsList()// 加载下一页数据
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
