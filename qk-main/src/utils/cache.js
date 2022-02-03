import store from 'storejs'
const prefix = 'qk-'

export default {
  /**
   * @description: 设置缓存
   * @param {String} key
   * @param {String} value
   */
  set(key, value) {
    store.set(`${prefix}${key}`, value)
  },

  /**
   * @description: 获取缓存
   * @param {String} key
   */
  get(key) {
    return store.get(`${prefix}${key}`)
  },

  /**
   * @description: 删除缓存
   * @param {String} key
   */
  remove(key) {
    store.remove(`${prefix}${key}`)
  },

  /**
   * @description: 删除所有缓存（指定前缀）
   */
  clearAll() {
    store.each(function (value, key) {
      if (key.startsWith(prefix)) {
        store.remove(key)
      }
    })
  },
}
