<template>
  <div>
    <div class="poster" :style="backgroundImg">
      <nav-bar class="navbar">
        <div slot="left">
          <i class="fa fa-chevron-left" aria-hidden="true" @click="backUp"></i>
          {{ listType }}
        </div>
      </nav-bar>
      <div class="describe">
        <p>{{listDetail.name}}</p>
        <p><i class="fa fa-headphones" aria-hidden="true"></i> {{listDetail.playCount | playCountFilter}}</p>
      </div>
    </div>
    <p class="songCount"><i class="fa fa-play-circle-o" aria-hidden="true"></i> 播放全部(共{{listDetail.trackCount}}首)</p>
    <scroll class="scroll-content" ref="scroll">
      <router-link class="songTitle" :to="{path:'/player' , query:{id:item.id}}" v-for="(item,index) in listDetail.tracks" :key="index">
        <i>{{index + 1}}</i>
        <div>
          <p>{{item.name}}</p>
          <p>{{item.ar[0].name}}</p>
        </div>
      </router-link>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import {getSongListDetail} from 'network/getDatas'
import {scrollRefreshMixin} from 'common/mixin'
export default {
  name: 'SongList',
  components: {
    NavBar,
    Scroll
  },
  mixins:[scrollRefreshMixin],
  data() {
    return {
      listType: '歌单',
      listId: '',
      listDetail: {},
    }
  },
  computed: {
    backgroundImg() {
      return `background-image:url(${this.listDetail.coverImgUrl}); background-repeat:no-repeat; background-size:100% 100%;`
    }
  },
  filters: {
    playCountFilter(value) {
      return Math.floor(value / 10000) + '万'
    }
  },
  // 更新data数据，dom加载完成发布事件
  created() {
    let type = this.$route.query.type
    if(type != 0) {
      this.listType = '歌手'
    }
    this.listId = this.$route.query.id
    this.getSongListDetail(this.listId)
    this.$nextTick(function(){
      this.$bus.$emit('elementLoaded')
    })
  },
  methods: {
    backUp() {
      this.$router.go(-1)
    },
    getSongListDetail(id) {
      getSongListDetail(id).then(res => {
        this.listDetail = res.playlist
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.poster {
  position: relative;
  height: 300px;
  color: $color-text-lm;
  .describe {
    position: absolute;
    bottom: 10px;
    left: 10px;
  }
  .navbar {
    box-shadow: none;
  }
}
.songCount{
  display: flex;
  align-items: center;
  height: 35px;
  font-size: $font-size-large-s;
  margin-left: 5px;
  i {
    margin-right: 10px;
    font-size: $font-size-large-x;
  }
  
}
.scroll-content {
  // 1vh等于当前视窗的1%
  height: calc(100vh - 335px);
  overflow: hidden;
  .songTitle {
    @extend .songCount;
    border-top: 1px solid $color-text-lm;
    padding: 5px 0;
  }
}
</style>