<template>
  <div>
    <!-- {{ $route.params.article_id }} -->
    {{ article_id }}
  </div>
</template>

<script>
export default {
  props: {
    article_id: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
