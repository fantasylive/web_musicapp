<template>
  <div v-if="topList.length">
    <scroll class="scroll-content" ref="scroll">
    <div class="toplist" v-for="(item,index) in topList" :key="item.id" @click="toSongList(item.id)">
      <img :src="item.coverImgUrl" alt="" @load="elementLoaded">
      <ol v-if="item.tracks.length">
        <li class="overflow">1.{{item.tracks[0].first}}</li>
        <li class="overflow">2.{{item.tracks[1].first}}</li>
        <li class="overflow">3.{{item.tracks[2].first}}</li>
      </ol>
    </div>
    </scroll>
  </div>
</template>

<script>
import { getToplist } from 'network/getDatas'
import { scrollRefreshMixin } from 'common/mixin'
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'Rank',
  components: { 
    Scroll 
  },
  mixins:[scrollRefreshMixin],
  data() {
    return {
      topList: []
    }
  },
  created() {
    this.getToplist()
  },
  activated() {
    this.elementLoaded()
  },
  methods: {
    // 点击跳转到歌单列表
    toSongList(id) {
      this.$router.push({path: '/songList' , query: {id}}).catch(()=>{})
    },
    getToplist() {
      getToplist().then(res => {
        this.topList = res.list
      })
    }
  }
}
</script>

<style lang='scss' scoped>
// 音乐名称长度超出显示省略号
.overflow{
    width:220px; // 超出这个长度显示省略号
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow:ellipsis;
}
.scroll-content {
  // 1vh等于当前视窗的1%
  height: calc(100vh - 94px);
  overflow: hidden;
}
.toplist {
  height: 100px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  padding: 10px;
  img {
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
    margin-right: 20px;
  }
  ol {
    display: inline-flex;
    flex-direction: column;
    vertical-align: top;
    li {
      margin-top: 13px;
    }
  }
}
</style>