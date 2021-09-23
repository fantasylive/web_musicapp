<template>
  <div>
    <keep-alive exclude="SongList,Artist,Search">
      <router-view />
    </keep-alive>
    <player-bar v-show="isShowBar" />
    <div class="shade_box" v-show="isShowPlayList"/>
    <play-list v-show="isShowPlayList" />
  </div>
</template>

<script>
import PlayerBar from 'components/content/playerbar/PlayerBar.vue'
import PlayList from 'components/content/playlist/PlayList.vue'
export default {
  name: 'App',
  components: {
    PlayerBar,
    PlayList
  },
  computed: {
    isShowBar() {
      return this.$store.getters.getShowBar
    },
    isShowPlayList() {
      return this.$store.getters.getShowPlayList
    }
  }
}
</script>

<style lang='scss'>
@import 'assets/css/index';
// 播放列表显示时的灰色遮罩层
.shade_box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(113, 113, 113, 0.5);
}
</style>