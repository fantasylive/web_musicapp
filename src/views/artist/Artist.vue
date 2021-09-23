<template>
  <div>
    <div class="poster" :style="backgroundImg">
      <nav-bar class="navbar">
        <span slot="left">
          <i class="fa fa-chevron-left" aria-hidden="true" @click="backUp"></i>
        </span>
        <span slot="center">{{ artistDetail.name }}</span>
      </nav-bar>
      <div class="describe">
        <div class="info_button" @click="open">歌手简介</div>
      </div>
    </div>
    <p class="songCount">
      <i class="fa fa-play-circle-o" aria-hidden="true"></i> 播放全部(共{{
        hotSongs.length
      }}首)
    </p>
    <scroll class="scroll-content" ref="scroll">
      <router-link
        class="songTitle"
        :to="{ path: '/player', query: { id: item.id } }"
        v-for="(item, index) in hotSongs"
        :key="item.id"
      >
        <i>{{ index + 1 }}</i>
        <div>
          <p>{{ item.name }}</p>
          <p>{{ item.ar[0].name }}</p>
        </div>
      </router-link>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import { getArtistSingles } from 'network/getDatas'
import { scrollRefreshMixin } from 'common/mixin'
export default {
  name: 'Artist',
  components: {
    NavBar,
    Scroll
  },
  mixins: [scrollRefreshMixin],
  data() {
    return {
      artistId: '',
      artistDetail: {},
      hotSongs: []
    }
  },
  computed: {
    backgroundImg() {
      return `background-image:url(${this.artistDetail.picUrl}); background-repeat:no-repeat; background-size:100% 100%;`
    }
  },
  filters: {
    playCountFilter(value) {
      return Math.floor(value / 10000) + '万'
    }
  },
  // 更新data数据，dom加载完成发布事件
  created() {
    this.artistId = this.$route.query.id
    this.getArtistSingles(this.artistId)
  },
  // 页面渲染完成时刷新scroll
  mounted() {
    this.$nextTick(function () {
      this.elementLoaded()
    })
  },
  methods: {
    // elementUI 歌手简介弹框  
    open() {
      this.$notify({
        title: this.artistDetail.name,
        dangerouslyUseHTMLString: true,
        message: `<p style="height:200px;padding:10px;overflow: scroll;overflow-x: hidden;">${this.artistDetail.briefDesc}</p>`,
        duration: 0
      })
    },
    backUp() {
      this.$router.go(-1)
    },
    getArtistSingles(id) {
      getArtistSingles(id).then((res) => {
        this.artistDetail = res.artist
        this.hotSongs = res.hotSongs
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
    .info_button {
      text-align: center;
      line-height: 40px;
      border-radius: 5px;
      height: 40px;
      width: 80px;
      background-color: rgba($color: black, $alpha: 0.2);
    }
  }
  .navbar {
    box-shadow: none;
  }
}
.songCount {
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