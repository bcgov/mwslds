const cache = {

  store: {},

  put(route, data) {
    this.store[route] = data
  },

  evict(route) {
    delete this.store[route]
  },

  invalidate(partialKey) {
    Object.keys(this.store).forEach((key) => {
      if (key.startsWith(partialKey)) {
        this.evict(key)
      }
    })
  },

  get(route) {
    return this.store[route]
  },
}

export default cache
