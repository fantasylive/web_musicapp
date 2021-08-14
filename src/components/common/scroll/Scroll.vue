<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script scoped>
import BScroll from '@better-scroll/core'
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  methods: {
    // 重新加载
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>
</style>