import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import animate from 'animate.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(animate)
Vue.use(ElementUI)

Vue.config.productionTip = false

// 添加事件总线 用于监听Goodsitem图片加载完成
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
