<template>
  <div>
    <div class="progress">
      <span class="time">{{ currentMinute }}:{{ currentSecond }}</span>
      <div class="progress-bar">
        <span :style="progressStyle"></span><i class="fa fa-circle" aria-hidden="true"></i>
      </div>
      <span class="time">{{ durationTime }}</span>
    </div>
    <div class="control">
      <i class="fa fa-refresh" aria-hidden="true"></i>
      <i class="fa fa-step-backward" aria-hidden="true" @click="playPreviousSong"></i>
      <span @click="changePlayStatus" class="play">
        <i v-if="paused" class="fa fa-play-circle-o" aria-hidden="true"></i>
        <i v-else class="fa fa-pause-circle-o" aria-hidden="true"></i>
      </span>
      <i class="fa fa-step-forward" aria-hidden="true" @click="playNextSong"></i>
      <i v-if="liked" class="fa fa-heart" aria-hidden="true" @click="addFavorite"></i>
      <i v-else class="fa fa-heart-o" aria-hidden="true" @click="addFavorite"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AudioController',
  props: {
    duration: {
      type: Number,
      default: 0
    },
    currentTime: {
      type: Number,
      default: 0
    },
    paused: {
      type: Boolean,
      default: false
    },
    liked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 当前播放进度
    progressStyle() {
      return `width: ${(this.currentTime / this.duration) * 96}%;`
    },
    // 当前播放时间的分钟数
    currentMinute() {
      return Math.floor(this.currentTime / 60)
    },
    // 当前播放时间的秒数
    currentSecond() {
      let second = Math.floor(this.currentTime % 60)
      return second < 10 ? '0' + second : second
    },
    // 歌曲总时长以分钟显示
    durationTime() {
      let second = Math.floor(this.duration % 60)
      let formatSecond = second < 10 ? '0' + second : second
      return Math.floor(this.duration / 60) + ':' + formatSecond
    }
  },
  watch: {
    currentTime() {
      // 防止数据到达前默认值进行比较
      if(this.duration != 0 && this.currentTime == this.duration) {
        this.changePlayStatus()
      }
    }
  },
  methods: {
    addFavorite() {
      this.$emit('AudioController_addFavorite')
    },
    changePlayStatus() {
      this.$emit('AudioController_changePlayStatus')
    },
    playPreviousSong() {
      this.$emit('AudioController_playPreviousSong')
    },
    playNextSong() {
      this.$emit('AudioController_playNextSong')
    }
  }
}
</script>

<style lang='scss' scoped>
.progress {
  display: flex;
  justify-content: center;
  color: $color-text-lm;
  font-size: $font-size-medium;
  .time {
    margin: 0 8px;
  }
  .progress-bar {
    margin-top: 4px;
    border-radius: 5px;
    background-color: darkgrey;
    height: 5px;
    width: 70%;
    span {
      display: inline-block;
      height: 100%;
      background-color: brown;
      vertical-align: top;
      border-radius: 5px;
    }
    i {
      // 进度按钮垂直居中
      font-size: 5px;
      line-height: 0;
      vertical-align: top;
      margin-top: 4px;
    }
  }
}
.control {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  color: $color-text-l;
  font-size: $font-size-large-x;
  .play {
    font-size: 45px;
  }
  & > i:not(.play) {
    margin-top: 10px;
  }
  .fa-heart {
    color: $color-theme;
  }
}
</style>