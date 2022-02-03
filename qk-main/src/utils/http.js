import axios from "axios"
import qs from "qs"
import token from "./token"

axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.headers.put["Content-Type"] = "application/json"

// 拦截请求
axios.interceptors.request.use(
  (config) => {
    let t = token.get()
    if (t && t.accessToken) {
      config.headers.Authorization = "Bearer " + t.accessToken
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应前拦截器
axios.interceptors.response.use(
  (response) => {
    const { config } = response
    if (response.data.code === "0") {
      return response.data.data || "0"
    } else {
      Message.error({
        message: response.data.msg,
        showClose: true,
        center: true,
        duration: 2000
      })
      return Promise.reject(response.data.msg)
    }
  },
  (error) => {
    //处理各种错误请求（这里不详细展开）
    console.error(`请求出错：${error}`)
    return Promise.reject(error)
  }
)

class http {
  constructor(baseUrl) {
    this.axios = axios
    axios.defaults.baseURL = baseUrl
  }

  /**
   * @description:GET 请求
   * @param {*} url
   * @param {*} params
   * @param {*} config
   */
  get(url, params, config) {
    const data = Object.assign({}, config, {
      // 参数
      params,
      // 修改参数序列化方法
      paramsSerializer: (p) => {
        // 使用逗号分隔参数
        return qs.stringify(p, {
          allowDots: true
        })
      }
    })
    return axios.get(url, data)
  }

  /**
   * @description: POST请求
   * @param {*} url
   * @param {*} params
   * @param {*} config
   */
  post(url, params, config) {
    return axios.post(url, params, config)
  }
}

export default (baseUrl) => {
  window.$http = new http(baseUrl)
}
