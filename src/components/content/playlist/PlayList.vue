<template>
  <transition name="playlist">
    <div class="playlist">
      <div class="top">
        <i class="fa fa-refresh" aria-hidden="true"></i>
        <span>循环播放 ({{ getSongList.length }})</span>
        <i class="fa fa-trash-o" aria-hidden="true" @click="clearList"></i>
      </div>
      <div class="wrapper" ref="wrapper">
        <div class="content">
          <div class="mid" v-for="(item, index) in getSongList" :key="item.songId">
            <i
              v-if="item.songId == nowPlayingSongId"
              class="fa fa-volume-up"
              aria-hidden="true"
            ></i>
            <i v-else> </i>
            <span @click="switchSong(item.songId)">{{ item.name }}</span>
            <i class="fa fa-times" aria-hidden="true" @click="removeSong(item.songId)"></i>
          </div>
        </div>
      </div>
      <div class="bottom" @click="closeList">关闭</div>
    </div>
  </transition>
</template>

<script>
import BScroll from '@better-scroll/core'
import {mapGetters} from 'vuex'
export default {
  name: 'PlayList',
  data() {
    return {
      scroll: null
    }
  },
  computed: {
    // 将vuex getters注入到computed中
    ...mapGetters(['getSongList','getNowPlaying','getShowPlayList']),

    nowPlayingSongId() {
      return this.getNowPlaying.songId
    }
  },
  watch: {
    // playlist显示时才初始化betterscroll，否则会出现可滚动区域计算出错，导致不能滚动
    getShowPlayList(newVal, oldVal) {
      if (newVal === true) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true
          })
        })
      }
    }
  },
  methods: {
    // 清空播放列表
    clearList() {
      this.$store.commit('CLEAR_LIST')
      this.$bus.$emit('PlayList_songRemoved')
    },
    closeList() {
      this.$store.commit('CHANGE_SHOWPLAYLIST')
    },
    switchSong(id) {
      this.$router.push({path: '/player' , query: {id:id}}).catch(()=>{})
    },
    removeSong(id) {
      this.$store.commit('DEL_SONG', {id:id})
      if(this.nowPlayingSongId === id) {
        this.$bus.$emit('PlayList_songRemoved')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
// 使用scss mixin减少代码重复
@mixin item_display {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  i {
    flex: 1;
    text-align: center;
  }
  span {
    flex: 7;
  }
}
.playlist-enter-active,
.playlist-leave-active {
  transition: all 0.5s;
}
.playlist-enter,
.playlist-leave-to {
  transform: translate3d(0, 50%, 0);
  opacity: 0;
}
.playlist {
  height: 300px;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-radius: 10px 10px 0 0;
  background-color: $color-text-l;
  color: $color-text-g;
  .wrapper {
    height: 200px;
    overflow: hidden;
  }
  .top {
    @include item_display;
  }
  .mid {
    @include item_display;
    i {
      color: $color-theme;
    }
  }
  .bottom {
    height: 50px;
    text-align: center;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>