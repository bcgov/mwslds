
const cache = {

  store: window.sessionStorage,

  put(key, data) {
    const json = JSON.stringify(data)
    this.store.setItem(key, json)
  },

  evict(key) {
    this.store.removeItem(key)
  },

  get(key) {
    const jsonData = this.store.getItem(key)
    if (!jsonData) {
      return null
    }
    return JSON.parse(jsonData)
  },
}

export default cache
