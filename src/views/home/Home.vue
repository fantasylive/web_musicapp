<template>
  <div>
    <nav-bar>
      <div slot="left">
        <router-link to="/user"><i class="fa fa-bars" aria-hidden="true"></i></router-link>
      </div>
      <div slot="center">myMusic</div>
      <div slot="right">
        <router-link to="/search"><i class="fa fa-search" aria-hidden="true"></i></router-link>
      </div>
    </nav-bar>
    <div class="nav">
      <router-link to="/recommend">推荐</router-link>
      <router-link to="/rank">排行</router-link>
      <router-link to="/singer">歌手</router-link>
    </div>
    <scroll class="scroll-content" ref="scroll">
      <keep-alive>
        <router-view />
      </keep-alive>
    </scroll>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import {scrollRefreshMixin} from 'common/mixin'
export default {
  name: 'Home',
  components: {
    NavBar,
    Scroll
  },
  mixins: [scrollRefreshMixin]
}
</script>

<style lang='scss' scoped>
.nav {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.scroll-content {
  // 1vh等于当前视窗的1%
  height: calc(100vh - 94px);
  overflow: hidden;
}
</style>