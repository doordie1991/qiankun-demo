import Vue from "vue"
import Vuex from "vuex"

import token from "./modules/token"
import user from "./modules/user"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    token,
    user
  }
})
