import {debounce} from 'common/utils'
export const scrollRefreshMixin = {
  computed: {
    refresh() {
      return this.$refs.scroll ? this.$refs.scroll.refresh : () => {}
    },
    debounceRefresh() {
      return debounce(this.refresh,1000)
    }
  },
  methods: {
    elementLoaded() {
     this.debounceRefresh()
    }
  }
}

// export const privateWatchMixin = {
//   data() {
//     return {
//       activatedFlag: false
//     }
//   },
//   mounted() {
//     this.activatedFlag = true
//   },
//   activated() {
//     this.activatedFlag = true
//   },
//   deactivated() {
//     this.activatedFlag = false
//   }
  
// }
