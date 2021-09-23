import Vue from 'vue'
import Vuex from 'vuex'
import PlayList from './playlist'
import Favorite from './favorite'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    PlayList,
    Favorite
  }
})
