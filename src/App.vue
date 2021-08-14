<template>
  <div>
    <keep-alive exclude="SongList,Player">
      <router-view />
    </keep-alive>

    <!-- <player-bar /> -->
  </div>
</template>

<script>
import PlayerBar from 'components/content/playerbar/PlayerBar.vue'
export default {
  name: 'App',
  components: {
    PlayerBar
  }
}
</script>

<style lang='scss'>
@import 'assets/css/index';
</style>