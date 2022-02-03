import "@/mock/modules/auth"

export default (name) => {
  const login = (params) => {
    return $http.post("/login", params)
  }

  const getInfo = () => {
    return $http.get("/getInfo")
  }
  
  return {
    login,
    getInfo
  }
}
