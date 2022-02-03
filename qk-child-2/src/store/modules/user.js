const state = {
  //用户编号
  userId: "",
  //用户编码
  userCode: "",
  //用户姓名
  userName: "",
  //性别
  sex: "",
  //职位
  jobName: "",
  //角色编码
  roleCodes: "",
  //角色名称
  roleNames: "",
  //菜单列表
  menus: [],
  //路由
  routes: [],
  //权限列表
  permissions: [],
  //额外数据
  extraData: ""
}

const mutations = {
  /**
   * @description: 初始化
   * @param {*} state
   * @param {*} user
   */
  init(state, user) {
    Object.assign(state, user)
  }
}

export default {
    namespaced: true,
    state,
    mutations
  }
  
