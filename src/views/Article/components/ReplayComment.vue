<template>
  <div>
    <van-nav-bar fixed :title="title" left-arrow @click-left="$emit('close')">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <CommentItem :item="comment" class="comment"></CommentItem>
    <van-cell title="全部回复" />
    <CommentItem
      :item="item"
      v-for="item in list"
      :key="item.com_id"
    ></CommentItem>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        plain
        block
        round
        type="primary"
        @click="isAddCommentShow = true"
        >朴素按钮</van-button
      >
    </div>
    <van-popup v-model="isAddCommentShow" position="bottom">
      <AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment'
import { getCommentsList } from '@/api/comment'
import CommentItem from './CommentItem.vue'
export default {
  name: 'repalyComment',
  props: {
    comment: {
      type: Object,
      default: () => ({})// 这里的返回值要➕（） 如果不加，vue会默认后面为函数体，但如果返回值是[]数组，则不用写
    }
  },
  created () {
    this.getCommentsList()
  },
  data () {
    return {
      offset: null,
      limit: 10,
      list: [],
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentsList () {
      try {
        const res = await getCommentsList({ type: 'c', source: this.comment.com_id, offset: this.offset, limit: this.limit })
        console.log(11, res)
        this.list = res.data.data.results
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommentItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  height: 110px;
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: pink;
}
</style>
