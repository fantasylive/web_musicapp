<template>
  <div>
    <swiper class="banner">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a>
          <img :src="item.pic" alt="" />
        </a>
      </swiper-item>
    </swiper>
    <h2>推荐歌单</h2>
    <scroll class="scroll-content" ref="scroll">
    <div class="recommend-list">
      <router-link :to="{path:'/songList' , query: {id:item.id}}" v-for="(item,index) in RecommendSongList" :key="index" class="list-item">
        <div class="item-img">
          <span><i class="fa fa-headphones" aria-hidden="true"></i> {{item.playCount | playCountFilter}}</span>
          <img :src="item.picUrl" alt=""  @load="elementLoaded">
        </div>
        <p>{{item.name}}</p>
      </router-link>
    </div>
    </scroll>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
import {getBanner,getRecommendSongList} from 'network/getDatas'
import Scroll from 'components/common/scroll/Scroll'
import { scrollRefreshMixin } from 'common/mixin'
export default {
  name: 'Recommend',
  components: {
    Swiper,
    SwiperItem,
    Scroll
  },
  mixins:[scrollRefreshMixin],
  data() {
    return{
      banners:[],
      RecommendSongList: [],
    }
  },
  filters: {
    playCountFilter(value) {
      return Math.floor(value / 10000) + '万'
    }
  },
  created() {
    this.getBanner()
    this.getRecommendSongList()
  },
  activated() {
    this.elementLoaded()
  },
  methods: {
    getBanner() {
      getBanner().then((res) => {
        this.banners = res.banners
      })
    },
    getRecommendSongList() {
      getRecommendSongList().then((res) => {
        this.RecommendSongList = res.result
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.banner {
  margin: 0 10px;
  border-radius: 5% 5% / 10% 10%;
}
h2 {
  margin: 15px 0 10px 5px;
  font-weight: bold;
}
.scroll-content {
  // 1vh等于当前视窗的1%
  height: calc(100vh - 270px);
  overflow: hidden;
}
.recommend-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .list-item {
    margin: 10px 0;
    flex: 0 1 115px;
    .item-img {
      position: relative;
      span {
        position: absolute;
        color: $color-text-ll;
        font-size: $font-size-small-ss;
        top: 2px;
        right: 2px;
      }
      img{
        border-radius: 5px;
        width: 100%;
      }
    }
    p {
      font-size: $font-size-small-ss;
      color: $color-text-g;
    }
  }
  
}
</style>