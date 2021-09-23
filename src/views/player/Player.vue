<template>
  <transition name="player">
    <div class="player" :style="background">
      <div class="content">
        <nav-bar class="navbar">
          <div slot="left" @click="backUp">
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
          <div slot="center" class="center">
            <h2>{{ playingSong.name }}</h2>
            <p>{{ playingSong.artist }}</p>
          </div>
        </nav-bar>
        <div
          v-if="playingSong.lyric"
          class="centerSection"
          @click="changeShowLyric"
        >
          <scroll v-show="showLyric" class="scroll-content" ref="scroll">
            <p v-for="(line, index) in playingSong.lyric.lines" :key="index">
              {{ line.txt }}
            </p>
          </scroll>
          <div v-show="!showLyric" class="disc">
            <img :src="playingSong.coverPic" alt="" :style="discStyle" />
          </div>
        </div>
        <div>
          <audio-controller
            :duration="duration"
            :currentTime="currentTime"
            :paused="playStatus"
            :liked="isFavorite"
            @AudioController_changePlayStatus="changePlayStatus"
            @AudioController_playPreviousSong="playPreviousSong"
            @AudioController_playNextSong="playNextSong"
            @AudioController_addFavorite="addFavorite"
          ></audio-controller>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { throttle } from 'common/utils'
import { getSongUrl, getSongDetail, getSongLyric } from 'network/getDatas'
import { scrollRefreshMixin } from 'common/mixin'
import Scroll from 'components/common/scroll/Scroll.vue'
import NavBar from 'components/common/navbar/NavBar.vue'
import AudioController from 'components/common/audio/AudioController.vue'
import Lyric from 'lyric-parser'

export default {
  name: 'Player',
  components: {
    NavBar,
    Scroll,
    AudioController
  },
  mixins: [scrollRefreshMixin],
  data() {
    return {
      throttleUpdateTime: throttle.call(this, this.updateTime, 1000),
      showLyric: true,
      songDetail: {
        songId: 0,
        songUrl: '',
        name: '',
        artist: '',
        coverPic: '',
        lyric: {},
        duration: 0,
        currentTime: 0,
        paused: false
      }
    }
  },
  computed: {
    background() {
      return `background-image:url(${this.playingSong.coverPic}); background-repeat:no-repeat; background-size:100% 100%;`
    },
    // 唱片在播放时才开始动画效果
    discStyle() {
      return this.playStatus ? `animation-play-state: paused;` : ''
    },
    duration() {
      return this.$store.getters.getDuration
    },
    currentTime() {
      return this.$store.getters.getCurrentTime
    },
    playStatus() {
      return this.$store.getters.getPlayStatus
    },
    playingSong() {
      return this.$store.getters.getNowPlaying
    },
    // 判断当前音乐是否在favorite列表中
    isFavorite() {
      return this.$store.getters.getFavoriteList.findIndex(song => song.songId === this.playingSong.songId) !== -1
    }
  },
  watch: {
    // 监听路径变化重新加载组件，判断当前路径是否在player下防止重复调用
    $route(to, from) {
      if (this.$route.query.id && this.$route.path == '/player') {
        // 如果显示playerBar就将它隐藏
        if (this.$store.getters.getShowBar) {
          this.$store.commit('CHANGE_SHOWBAR')
        }
        // 隐藏playlist
        if (this.$store.getters.getShowPlayList) {
          this.$store.commit('CHANGE_SHOWPLAYLIST')
        }
        // 同一首音乐不刷新
        if (this.$route.query.id !== this.playingSong.songId) {
          this.songDetail.songId = this.$route.query.id
          this.getSongDetail(this.songDetail.songId).then(() => {
            // 将当前歌曲添加到列表中
            // JSON.parse(JSON.stringify(this.songDetail))使用浅拷贝每次提交时都是一个不同的对象
            this.$store.commit('ADD_SONG', {
              song: JSON.parse(JSON.stringify(this.songDetail))
            })
            // 通知播放器已添加完歌曲
            this.$bus.$emit('Player_songAdd')
          })
        }
      }
    }
  },
  created() {
    // 如果显示playerBar就将它隐藏
    if (this.$store.getters.getShowBar) {
      this.$store.commit('CHANGE_SHOWBAR')
    }
    // 隐藏playlist
    if (this.$store.getters.getShowPlayList) {
      this.$store.commit('CHANGE_SHOWPLAYLIST')
    }
    this.songDetail.songId = this.$route.query.id
    this.getSongDetail(this.songDetail.songId).then(() => {
      // 将当前歌曲添加到列表中
      // JSON.parse(JSON.stringify(this.songDetail))使用浅拷贝每次提交时都是一个不同的对象
      this.$store.commit('ADD_SONG', {
        song: JSON.parse(JSON.stringify(this.songDetail))
      })
      // 通知播放器已添加完歌曲
      this.$bus.$emit('Player_songAdd')
    })

    /**
     *  问题出在这，数据还没写入对象中就提交commit了，所以路径什么的都没有值，要使用promise
     *  对象覆盖问题，是因为每次都是修改同一个对象并提交，他们的地址值是相同的，也就是说vuex中存了一个对象存了好几次，一个对象修改，那当然所有的都就修改了
     *  JSON.parse(JSON.stringify(this.songDetail))使用浅拷贝每次提交时都是一个不同的对象，即可解决
     *
     */
  },
  // 页面渲染完成时刷新歌词的scroll
  mounted() {
    this.$nextTick(function () {
      if(this.$refs.scroll) {
        this.elementLoaded()
      }
    })
  },
  deactivated() {
    // 离开组件时显示playerbar
    if (!this.$store.getters.getShowBar) {
      this.$store.commit('CHANGE_SHOWBAR')
    }
  },
  methods: {
    addFavorite() {
      this.$store.commit('ADD_FAVORITE', {song: this.playingSong})
    },
    playPreviousSong() {
      this.$bus.$emit('Player_playPreviousSong')
    },
    playNextSong() {
      this.$bus.$emit('Player_playNextSong')
    },
    changeShowLyric() {
      this.showLyric = !this.showLyric
    },
    backUp() {
      this.$router.go(-1)
    },
    // 监听事件改变播放状态
    changePlayStatus() {
      // 发出更改播放状态事件，playerBar组件监听到事件后更改播放状态并更新至Vuex
      this.$bus.$emit('Player_changePlayStatus')
    },
    // 获取音乐数据
    getSongDetail(id) {
      return Promise.all([
        getSongUrl(id).then((res) => {
          this.songDetail.songUrl = res.data[0].url
        }),
        getSongDetail(id).then((res) => {
          this.songDetail.name = res.songs[0].name
          this.songDetail.coverPic = res.songs[0].al.picUrl
          this.songDetail.artist = res.songs[0].ar[0].name
        }),
        getSongLyric(id).then((res) => {
          this.songDetail.lyric = new Lyric(res.lrc.lyric)
        })
      ])
    }
  }
}
</script>

<style lang='scss' scoped>
.player-enter-active,
.player-leave-active {
  transition: all 0.3s;
}
.player-enter,
.player-leave-to {
  transform: translate3d(0, 50%, 0);
  opacity: 0;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.player {
  height: 100vh;
  position: relative;
  overflow: hidden;
  // 实现背景模糊
  &::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    filter: blur(20px);
    z-index: 2;
    // 解决边缘不模糊问题
    transform: scale(1.2);
  }
  .content {
    position: relative;
    z-index: 99;
    .navbar {
      box-shadow: none;
      color: $color-text-l;
      .center {
        h2 {
          font-weight: bold;
        }
        p {
          margin-top: -20px;
          font-size: $font-size-medium;
        }
      }
    }
    .centerSection {
      display: flex;
      height: 500px;
      align-items: center;
      justify-content: center;
      .scroll-content {
        text-align: center;
        height: 400px;
        overflow: hidden;
        font-size: $font-size-large;
        font-weight: bold;
        color: $color-text-gg;
        p {
          margin-bottom: 15px;
        }
      }
      .disc {
        img {
          border: 10px solid $color-theme-d;
          height: 250px;
          width: 250px;
          border-radius: 145px;
          animation: rotation 40s linear infinite;
        }
      }
    }
  }
}
</style>