import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态实例
let store
// 状态配置项
let options = {
  namespaced: true,
  modules: {
    app: {
      namespaced: true,
      modules: {},
    },
    module: {
      namespaced: true,
      modules: {},
    },
  },
}

const requireComponent = require.context('./modules', true, /\.js$/)
requireComponent.keys().map((fileName) => {
  const key = fileName.replace('./', '').replace('.js', '')
  options.modules.app.modules[key] = requireComponent(fileName).default
})

export default () => {
  store = new Vuex.Store(options)
}

export { store, options }
