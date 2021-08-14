import {debounce} from 'common/utils'
export const scrollRefreshMixin = {
  data() {
    return {
      elementLoadListener: null
    }
  },
  mounted() {
    this.elementLoadListener = debounce(this.$refs.scroll.refresh,1000)
    // 监听子路由图片加载完成刷新scroll
    this.$bus.$on('elementLoaded', this.elementLoadListener)
  },
  // 组件销毁前停止监听
  beforeDestroy() {
    this.$bus.$off('elementLoaded', this.elementLoadListener)
  },
  // 组件不活跃时停止监听
  deactivated() {
    this.$bus.$off('elementLoaded', this.elementLoadListener)
  }
}