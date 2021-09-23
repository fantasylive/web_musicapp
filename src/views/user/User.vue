<template>
  <transition name="user">
    <div>
      <nav-bar class="navbar">
        <i slot="left" class="fa fa-chevron-left" aria-hidden="true" @click="backUp"></i>
        <span slot="center">我的收藏</span>
      </nav-bar>
      <p class="songCount"><i class="fa fa-play-circle-o" aria-hidden="true"></i> 播放全部(共{{getFavoriteList.length}}首)</p>
      <scroll class="scroll-content" ref="scroll">
      <router-link class="songTitle" :to="{path:'/player' , query:{id:item.songId}}" v-for="(item,index) in getFavoriteList" :key="item.songId">
        <i>{{index + 1}}</i>
        <div>
          <p>{{item.name}}</p>
          <p>{{item.artist}}</p>
        </div>
      </router-link>
      </scroll>
    </div>
  </transition>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import { mapGetters } from 'vuex'
export default {
  name: 'User',
  components: { 
    NavBar,
    Scroll 
  },
  computed: {
    ...mapGetters(['getFavoriteList'])
  },
  mounted() {
    // 使用$nextTick在整个页面都渲染完成时刷新
    this.$nextTick(function(){
      this.$refs.scroll.refresh()
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  methods: {
    backUp() {
      this.$router.go(-1)
    },
  }
}
</script>

<style lang='scss' scoped>
.user-enter-active,
.user-leave-active {
  transition: all 0.3s;
}
.user-enter,
.user-leave-to {
  transform: translate3d(-50%, 0, 0);
  opacity: 0;
}
.navbar {
  box-shadow: none;
}
.songCount{
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
  height: calc(100vh - 94px);
  overflow: hidden;
  .songTitle {
    @extend .songCount;
    border-top: 1px solid $color-text-lm;
    padding: 5px 0;
  }
}
</style>