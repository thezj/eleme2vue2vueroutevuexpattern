// 全局对象加载
import Vue from 'vue'
import './partelementui'
import VueRouter from 'vue-router'
import axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.prototype.$http = axios
axios.defaults.withCredentials = true
import './style/index.css'
import './style/main.less'
import './style/font-awesome.min.css'

//定义全局组件
import './common'

//定义路由匹配规则
import routesList from './router'
const router = new VueRouter({
  routes: routesList
})

//vuex配置
const store = new Vuex.Store({
  state: {
    global: {}
  },
  mutations: {
    setGlobal(state, param) {
      state.global = param
    }
  }
})

//在DOM中创建挂载div，初始化vue
document.body.innerHTML = '<div class="appframe"><div id="app" /></div>'
var app = new Vue({
  router,
  store,
  render(h) {
    return <router-view / >
  },
  el: '#app'
})