<template>
  <transition name="player">
    <div class="player" :style="background">
      <div class="content">
        <nav-bar class="navbar">
          <div slot="left" @click="backUp">
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
          </div>
          <div slot="center" class="center">
            <h2>{{ songDetail.name }}</h2>
            <p>{{ songDetail.artist }}</p>
          </div>
        </nav-bar>
        <div class="centerSection" @click="changeShowLyric">
          <scroll v-show="showLyric" class="scroll-content" ref="scroll">
            <p v-for="(line, index) in songDetail.lyric.lines" :key="index">
              {{ line.txt }}
            </p>
          </scroll>
          <div v-show="!showLyric" class="disc">
            <img :src="songDetail.coverPic" alt="" :style="discStyle"/>
          </div>
        </div>
        <div>
          <audio-controller
            :duration="duration"
            :currentTime="currentTime"
            @changePlayStatus="changePlayStatus"
          ></audio-controller>
          <audio
            :src="songDetail.songUrl"
            ref="audio"
            @canplay="ready"
            @timeupdate="throttleUpdateTime"
          ></audio>
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
      paused: true,
      duration: 0,
      currentTime: 0,
      throttleUpdateTime: throttle.call(this, this.updateTime, 1000),
      showLyric: true,
      songDetail: {
        songId: 0,
        songUrl: '',
        name: '',
        artist: '',
        coverPic: '',
        lyric: {}
      }
    }
  },
  computed: {
    background() {
      return `background-image:url(${this.songDetail.coverPic}); background-repeat:no-repeat; background-size:100% 100%;`
    },
    // 唱片在播放时才开始动画效果
    discStyle() {
      return this.paused ? `animation-play-state: paused;` : ''
    }
  },
  created() {
    this.songDetail.songId = this.$route.query.id
    this.getSongUrl(this.songDetail.songId)
    this.getSongDetail(this.songDetail.songId)
    this.getSongLyric(this.songDetail.songId)
    this.$nextTick(function () {
      this.$bus.$emit('elementLoaded')
    })
  },
  methods: {
    changeShowLyric() {
      this.showLyric = !this.showLyric
    },
    backUp() {
      this.$router.go(-1)
    },
    // 监听事件改变播放状态
    changePlayStatus() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.paused = false
      } else {
        this.$refs.audio.pause()
        this.paused = true
      }
    },
    ready() {
      this.duration = this.$refs.audio.duration
    },
    updateTime() {
      this.currentTime = this.$refs.audio.currentTime
    },
    getSongUrl(id) {
      getSongUrl(id).then((res) => {
        this.songDetail.songUrl = res.data[0].url
      })
    },
    getSongDetail(id) {
      getSongDetail(id).then((res) => {
        this.songDetail.name = res.songs[0].al.name
        this.songDetail.coverPic = res.songs[0].al.picUrl
        this.songDetail.artist = res.songs[0].ar[0].name
      })
    },
    getSongLyric(id) {
      getSongLyric(id).then((res) => {
        this.songDetail.lyric = new Lyric(res.lrc.lyric)
      })
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
          animation: rotation 20s linear infinite;
        }
      }
    }
  }
}
</style>