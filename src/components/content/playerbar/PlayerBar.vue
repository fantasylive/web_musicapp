<template>
  <div class="playerbar">
    <audio
      autoplay="true"
      :src="song.songUrl"
      ref="audio"
      @canplay="ready"
      @timeupdate="throttleUpdateTime"
    ></audio>
    <img :src="song.coverPic" alt="" @click="backToPlayer"/>
    <div class="middleside">
      <p>{{ song.name }}</p>
      <p>{{ song.artist }}</p>
    </div>
    <div class="rightside">
      <span @click="changePlayStatus">
        <i v-if="song.paused" class="fa fa-play-circle-o" aria-hidden="true"></i>
        <i v-else class="fa fa-pause-circle-o" aria-hidden="true"></i>
      </span>
      <i class="fa fa-list-ul" aria-hidden="true" @click="showPlayList"></i>
    </div>
  </div>
</template>

<script>
import { throttle } from 'common/utils'
export default {
  name: 'PlayerBar',
  data() {
    return {
      duration: 0,
      currentTime: 0,
      song: {}
    }
  },
  computed: {
    // 每一秒更新一次当前播放时间
    throttleUpdateTime() {
      return throttle.call(this, this.updateTime, 1000)
    }
  },
  created() {
    this.$bus.$on('Player_songAdd', this.getFirstSong)
    // 监听player组件发出的更改播放状态的事件
    this.$bus.$on('Player_changePlayStatus', this.changePlayStatus)
    // 监听当前播放歌曲从播放列表移除时切换歌曲，清空列表也视为移除歌曲的一种
    this.$bus.$on('PlayList_songRemoved', this.getFirstSong)
    // 监听音乐控制器发出的上一首下一首切换事件
    this.$bus.$on('Player_playPreviousSong', this.playPreviousSong)
    this.$bus.$on('Player_playNextSong', this.playNextSong)
  },
  methods: {
    playPreviousSong() {
      if(this.$store.getters.getSongList.length > 1) {
        this.song = this.$store.getters.getPreviousSong
      }
    },
    playNextSong() {
      if(this.$store.getters.getSongList.length > 1) {
        this.song = this.$store.getters.getNextSong
      }
    },
    // 点击显示当前播放列表
    showPlayList() {
      this.$store.commit('CHANGE_SHOWPLAYLIST')
    },
    backToPlayer() {
      this.$router.push({path: '/player', query: {id: this.song.songId}})
    },
    // 播放状态和Vuex中的数据绑定
    changePlayStatus() {
      if (this.$store.getters.getPlayStatus) {
        this.$refs.audio.play()
        this.$store.commit('CHANGE_PLAYSTATUS')
      } else {
        this.$refs.audio.pause()
        this.$store.commit('CHANGE_PLAYSTATUS')
      }
    },
    // 音乐加载完成提交音乐时长数据
    ready() {
      this.$store.commit('ADD_DURATION', {duration: this.$refs.audio.duration})
      this.$store.commit('ADD_NOWPLAYING', {song: this.song})
      // 通知Player组件NOWPLAYING已添加，可以读取背景图片路径
      this.$bus.$emit('PlayerBar_ADD_NOWPLAYING')
    },
    // 更新音乐当前播放时间
    updateTime() {
      this.$store.commit('ADD_CURRENTTIME', {currentTime: this.$refs.audio.currentTime})
    },
    getFirstSong() {
      // 如果当前音乐列表中有元素就获取，否则视为列表已为空，执行else一系列操作
      if(this.$store.getters.getSongList.length!==0) {
        this.song = this.$store.getters.getFirstSong
      }else {
        this.$refs.audio.pause()
        this.song = {}
        this.$store.commit('ADD_NOWPLAYING', {song:{}})
        // 通知Player组件NOWPLAYING已添加，可以读取背景图片路径
        this.$bus.$emit('PlayerBar_ADD_NOWPLAYING')
        this.$store.commit('CHANGE_SHOWBAR')
      }
      
    }
  }
}
</script>

<style lang='scss' scoped>
.playerbar {
  display: flex;
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: $color-text-ll;
  justify-content: space-around;
  align-items: center;
  img {
    height: 40px;
    border-radius: 20px;
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
  }
  .middleside {
    flex: 8;
  }
  .rightside {
    font-size: 30px;
    color: $color-text-g;
    flex: 3;
    span {
      margin-right: 10px;
    }
  }
}
</style>