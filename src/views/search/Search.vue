<template>
  <transition name="search">
    <div class="search">
      <nav-bar class="navbar">
        <i slot="left" class="fa fa-chevron-left" aria-hidden="true" @click="backUp"></i>
        <div slot="center">
           <el-input placeholder="请输入关键词" v-model.trim="input" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="startSearch"></el-button>
          </el-input>
        </div>
      </nav-bar>
      <div class="recommend_search" v-if="searchResult.length === 0">
        <h5>热门搜索</h5>
        <el-tag class="el_tag" type="info" v-for="(item, index) in hotSearch" :key="index" @click="hotTagClick(item.first)">{{item.first}}</el-tag>
      </div>
      <scroll class="scroll-content" ref="scroll" v-else>
        <router-link class="songTitle" :to="{path:'/player' , query:{id:item.id}}" v-for="(item,index) in searchResult" :key="item.id">
          <i>{{index + 1}}</i>
          <div>
            <p class="overflow">{{item.name}}</p>
            <p>{{item.artists[0].name}} <span v-if="item.artists[1]">{{item.artists[1].name}}</span></p>
          </div>
        </router-link>
      </scroll>
    </div>
  </transition>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import { getHotSearch, getSearchResult } from 'network/getDatas'
export default {
  name: 'Search',
  components: { 
    NavBar,
    Scroll 
  },
  data() {
    return {
      input:'',
      hotSearch:[],
      searchResult:[]
    }
  },
  created() {
    this.getHotSearch()
  },
  methods: {
    hotTagClick(tag) {
      this.input = tag
      this.startSearch()
    },
    startSearch() {
      getSearchResult(this.input).then(res => {
        this.searchResult = res.result.songs
      })
    },
    backUp() {
      this.$router.go(-1)
    },
    getHotSearch() {
      getHotSearch().then(res => {
        this.hotSearch = res.result.hots
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.search-enter-active,
.search-leave-active {
  transition: all 0.3s;
}
.search-enter,
.search-leave-to {
  transform: translate3d(50%, 0, 0);
  opacity: 0;
}
.overflow{
  width:300px; // 超出这个长度显示省略号
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow:ellipsis;
}
.navbar {
  box-shadow: none;
}
.scroll-content {
  height: calc(100vh - 44px);
  overflow: hidden;
}
.search {
  height: 100vh;
  .recommend_search {
    margin-top: 10px;
    padding: 10px 10px;
    h5 {
      margin-bottom: 5px;
    }
    .el_tag {
      margin: 5px 5px;
    }
  }
  .songTitle {
    display: flex;
    align-items: center;
    height: 35px;
    font-size: $font-size-large-s;
    margin-left: 5px;
    i {
      display: inline-block;
      width: 20px;
      text-align: center;
      margin-right: 15px;
      font-size: $font-size-large-x;
    }
    border-top: 1px solid $color-text-lm;
    padding: 5px 0;
  }
}

</style>