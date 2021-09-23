<template>
  <div>
    <scroll class="scroll-content" ref="scroll">
    <div class="artist" v-for="(item, index) in artists" :key="item.id" @click="toArtist(item.id)">
      <img :src="item.img1v1Url" alt="" @load="elementLoaded">
      <span>{{item.name}}</span>
    </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import {getTopArtists} from 'network/getDatas'
import {scrollRefreshMixin} from 'common/mixin'
export default {
  name: 'Singer',
  components: {
    Scroll
  },
  mixins:[scrollRefreshMixin],
  data() {
    return {
      artists: []
    }
  },
  created() {
    this.getTopArtists()
  },
  activated() {
    this.elementLoaded()
  },
  methods: {
    toArtist(id) {
      this.$router.push({path: '/artist', query: {id}}).catch(()=>{})
    },
    getTopArtists() {
      getTopArtists().then(res => {
        this.artists = res.artists
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.scroll-content {
  // 1vh等于当前视窗的1%
  height: calc(100vh - 94px);
  overflow: hidden;
}
.artist {
  height: 70px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  padding: 15px 10px;
  img {
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
    vertical-align: middle;
    margin-right: 15px;
  }
}
</style>