import Vue from 'vue'
import Vuex from 'vuex'
import PlayList from './playlist'
import Favorite from './favorite'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingInstance: undefined
  },
  mutations: {
    [types.ADD_LOADINGINSTANCE](state, payload) {
      state.loadingInstance = payload.loadingInstance
    }
  },
  modules: {
    PlayList,
    Favorite
  }
})
