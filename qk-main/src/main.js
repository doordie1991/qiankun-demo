import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'

import './mock'
import app from './app'
import api from './api'

import userHttp from './utils/http'
import useStore, { store, storeOptions } from './store'
import useRouter, { router, routes } from './router/'

import { registerApps } from './qiankun/index'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.productionTip = false

userHttp(app.serviceUrl)
useStore()
useRouter(store, app)

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')

registerApps()
