const cache = {

  data: {},

  put(route, data) {
    this.data[route] = data
  },

  evict(route) {
    delete this.data[route]
  },

  get(route) {
    return this.data[route]
  },
}

export default cache
