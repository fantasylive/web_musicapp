import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Recommend = () => import('views/home/childComps/Recommend')
const Rank = () => import('views/home/childComps/Rank')
const Singer = () => import('views/home/childComps/Singer')
const User = () => import('views/user/User')
const Search = () => import('views/search/Search')
const SongList = () => import('views/songList/SongList')
const Player = () => import('views/player/Player')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path:'/',
        redirect: '/recommend'
      },
      {
        path: '/recommend',
        component: Recommend
      },
      {
        path: '/rank',
        component: Rank
      },
      {
        path: '/singer',
        component: Singer
      }
    ]
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/songList',
    component: SongList
  },
  {
    path: '/player',
    component: Player
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
