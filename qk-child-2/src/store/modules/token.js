const state = {
  //请求令牌
  accessToken: "",
  //刷新令牌
  refreshToken: ""
}

const mutations = {
  /**
   * @description: 初始化
   * @param {*} state
   * @param {*} token
   */
  init(state, token) {
    Object.assign(state, token)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
