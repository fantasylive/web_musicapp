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
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'Home',
  components: {
    NavBar
  }
}
</script>

<style lang='scss' scoped>
.nav {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.content {
  // 1vh等于当前视窗的1%
  height: calc(100vh - 94px);
  overflow: hidden;
}
</style>