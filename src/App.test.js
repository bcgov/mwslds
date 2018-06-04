import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import cache from './cache/SimpleCache'
// mock the browser cache to use the simple one
global.sessionStorage = {
  setItem: (route, data) => { cache.store[route] = data },
  getItem: route => (cache.store[route]),
  removeItem: (route) => { delete cache.store[route] },
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
