import "@/mock/modules/auth"

export default (name) => {
  const login = (params) => {
    return $http.post("/login", params)
  }
  //获取用户信息 
  const getInfo = () => {
    return $http.get("/getInfo")
  }
  
  return {
    login,
    getInfo
  }
}
