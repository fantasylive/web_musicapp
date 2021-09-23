import * as types from './mutation-types'
export default {
  state: {
    favoriteList:[]
  },
  getters: {
    getFavoriteList(state) {
      return state.favoriteList
    }
  },
  mutations: {
    [types.ADD_FAVORITE](state, payload) {
      if(state.favoriteList.every(song => song.songId !== payload.song.songId)){
        state.favoriteList.unshift(payload.song)
      }else {
        // 如果当前添加的音乐在列表中已经存在就将它移除
        state.favoriteList.splice(state.favoriteList.findIndex(song => song.songId === payload.song.songId), 1)
      }
    }
  }
}