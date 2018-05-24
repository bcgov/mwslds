const cache = {

  store: {},

  put(route, data) {
    this.store[route] = data
  },

  evict(route) {
    delete this.store[route]
  },

  get(route) {
    return this.store[route]
  },
}

export default cache
