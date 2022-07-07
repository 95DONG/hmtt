<template>
  <van-field
    v-model.trim="message"
    rows="2"
    ref="field"
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
    center
    class="add-field"
  >
    <template #extra>
      <van-button
        type="default"
        :disabled="message.length === 0"
        class="btn"
        @click="onClick"
        >发布</van-button
      >
    </template>
  </van-field>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'AddComment',
  props: {
    target: {
      type: [Number, String],
      required: true
    },
    art_id: {
      // 如果对文章进行评论不用传值，对评论进行评论需要传值
      type: [String, Number]
    }
  },
  created () { },
  data () {
    return {

      addCommentShow: false, // 底部评论弹出层的隐藏弹出变量
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message
        })
        console.log(11, res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  }
}
</script>

<style scoped lang='less'>
.add-field {
  align-items: center;
  .btn {
    border: none;
  }
}
</style>
