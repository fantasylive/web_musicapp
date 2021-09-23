import * as types from './mutation-types'
export default {
  state: {
    showPlayList:false,
    showBar:false,
    nowPlaying: {},
    songList:[],
  },
  getters: {
    getNowPlaying(state) {
      return state.nowPlaying
    },
    getSongList(state) {
      return state.songList
    },
    getFirstSong(state) {
      return state.songList[0]
    },
    getShowBar(state) {
      return state.showBar
    },
    getShowPlayList(state) {
      return state.showPlayList
    },
    getDuration(state) {
      // 判断当前音乐数组是否有数据，没有数据时返回默认值
      return state.nowPlaying ? state.nowPlaying.duration : 0
    },
    getCurrentTime(state) {
      return state.nowPlaying ? state.nowPlaying.currentTime : 0
    },
    getPlayStatus(state) {
      return state.nowPlaying ? state.nowPlaying.paused : false
    },
    getPreviousSong(state) {
      if(state.songList.length > 1) {
        if(state.songList.findIndex(song => song.songId === state.nowPlaying.songId) === 0) {
          return state.songList[state.songList.length - 1]
        }else {
          return state.songList[state.songList.findIndex(song => song.songId === state.nowPlaying.songId) - 1]
        }
      }
    },
    getNextSong(state) {
      if(state.songList.length > 1) {
        if(state.songList.findIndex(song => song.songId === state.nowPlaying.songId) === state.songList.length - 1) {
          return state.songList[0]
        }else {
          return state.songList[state.songList.findIndex(song => song.songId === state.nowPlaying.songId) + 1]
        }
      }
    }
  },
  mutations: {
    [types.ADD_SONG](state, payload) {
      // 当前列表中存在的歌曲不重复添加
      if(state.songList.every((song) => song.songId !== payload.song.songId)){
        state.songList.unshift(payload.song)
      }else {
        // 如果当前添加的音乐在列表中已经存在就将它置顶
        state.songList.unshift(state.songList.splice(state.songList.findIndex((song) => song.songId === payload.song.songId), 1)[0])
      }
    },
    [types.ADD_DURATION](state, payload) {
      state.songList[0].duration = payload.duration
    },
    [types.ADD_CURRENTTIME](state, payload) {
      state.nowPlaying.currentTime = payload.currentTime
    },
    [types.CHANGE_SHOWBAR](state) {
      state.showBar = !state.showBar
    },
    [types.CHANGE_PLAYSTATUS](state) {
      state.nowPlaying.paused = !state.nowPlaying.paused
    },
    [types.CHANGE_SHOWPLAYLIST](state) {
      state.showPlayList = !state.showPlayList
    },
    [types.ADD_NOWPLAYING](state, payload) {
      state.nowPlaying = payload.song
    },
    [types.DEL_SONG](state, payload) {
      if(state.songList.findIndex(song => song.songId === payload.id) !== -1){
        state.songList.splice(state.songList.findIndex(song => song.songId === payload.id), 1)
      }
    },
    [types.CLEAR_LIST](state) {
      state.songList = []
    }
  },
}