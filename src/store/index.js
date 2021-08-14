import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList:[],
    nowPlayingSong:{
    }
  },
  mutations: {
    addSong(state, payload) {
      state.songList.push(payload.song)
    }
  },
})
