import { request } from "./request"
export {getBanner,getRecommendSongList,getSongListDetail,getSongUrl,getSongDetail,getSongLyric}

function getBanner(){
  return request({
    url:'/banner?type=2',
    method:'get'
  })
}

function getRecommendSongList() {
  return request({
    url: '/personalized',
    method: 'get'
  })
}

function getSongListDetail(id) {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id
    }
  })
}

function getSongUrl(id) {
  return request({
    url:'/song/url',
    method:'get',
    params: {
      id
    }
  })
}

function getSongDetail(id) {
  return request({
    url:'/song/detail',
    method:'get',
    params: {
      ids: id
    }
  })
}

function getSongLyric(id) {
  return request({
    url:'/lyric',
    method:'get',
    params: {
      id
    }
  })
}