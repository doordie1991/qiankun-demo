import token from "@/utils/token"
import _ from 'lodash'

const state = {
  //配置
  config: {
    //应用名称
    title: "qiankun-demo",
    //应用logo
    logo: "./images/logo.png",
    //首页
    home: "/home",
    //版本号
    version: "1.0.0",
    //版权
    copyright: "版权所有：陈曦·LR | 用代码改变世界 Powered by EasyModular"
  },
  //服务地址
  serviceUrl: ""
}

const mutations = {
  /**
   * @description: 初始化
   * @param {*} state
   * @param {*} app
   */
  init(state, app) {
    _.merge(state, app)
  }
}

const actions = {
  /**
   * @description: 初始化
   * @param {*} commit
   * @param {*} dispatch
   * @param {*} app
   */
  async init({ commit, dispatch }, app) {
    commit("init", app)
    // 配置页面信息
     await dispatch("app/page/load", null, { root: true })
  },

  /**
   * @description: 登录
   * @param {*} state
   * @param {*} params
   */
  login({ state }, params) {
    return state.actions.auth.login(params)
  },

  /**
   * @description 退出
   */
  async logout({ dispatch }) {
    // 删除令牌
    token.remove()

    // 账号退出
    dispatch("app/user/logout", null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
