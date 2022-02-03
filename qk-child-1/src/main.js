import Vue from "vue"
import App from "./App.vue"
import Router from "vue-router"
import router from "./router"
import store from "./store"

Vue.use(Router)
Vue.config.productionTip = false

let instance = null

function render(props = {}) {
  const { container } = props

  props.onGlobalStateChange((state) => {
    console.log(state)
    Object.keys(state).forEach((key) => {
      if (key === "token") {
        store.commit("token/init", state[key])
      }

      if (key === "userInfo") {
        store.commit("user/init", state[key])
      }
    })
  }, true)

  instance = new Vue({
    store,
    router,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector("#app") : "#app")
}

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

//--------- 生命周期函数------------//
export async function bootstrap() {
  console.log("[child-1] vue app bootstraped")
}
export async function mount(props) {
  console.log("[child-1] props from main framework", props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ""
  instance = null
}
