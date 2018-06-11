import React from 'react'

import { TOKEN_ROUTE } from './Routes'

const TokenSingleton = {
  token: null,
  auth: null,
  pendingPromises: [],

  loadToken() {
    if (!this.auth) {
      const noAuthError = Error('No Auth Provided')
      this.rejectPending(noAuthError)
      return Promise.reject(noAuthError)
    }

    const options = {
      method: 'POST',
      body: JSON.stringify({
        auth: this.auth,
      }),
      headers: new Headers({
        'content-type': 'application/json',
      }),
    }

    return fetch(TOKEN_ROUTE, options)
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText)
        }
        return resp.json()
      })
      .then((parsed) => {
        this.token = parsed.token
        this.resolvePending(this.token)
        return this.token
      })
      .catch((error) => {
        this.rejectPending(error)
        return error
      })
  },

  resolvePending(token) {
    const promises = this.pendingPromises
    this.pendingPromises = []
    promises.forEach(promise => promise.resolve(token))
  },

  rejectPending(error) {
    const promises = this.pendingPromises
    this.pendingPromises = []
    promises.forEach(promise => promise.reject(error))
  },

  getToken() {
    if (!this.token) {
      const promise = (resolve, reject) => {
        // keep track of promises for when loading happens
        this.pendingPromises.push({ resolve, reject })
      }
      return new Promise(promise)
    }
    return Promise.resolve(this.token)
  },
}

function setAuth(auth) {
  TokenSingleton.auth = auth
  TokenSingleton.loadToken()
}

export { setAuth }
export { TokenSingleton }

// HOC provide a token to the wrapped component
export default function withToken(Wrapped) {
  return class WithTokenHOC extends React.Component {
    constructor(props) {
      super(props)

      this.setToken()
      this.state = {}
    }

    setToken() {
      TokenSingleton.getToken()
        .then((token) => {
          this.setState({
            token,
          })
        })
        .catch((err) => {
          this.setState({
            error: err,
          })
        })
    }

    render() {
      return <Wrapped {...this.state} {...this.props} />
    }
  }
}

export const invalidTokenMessage = {
  type: 'danger',
  title: 'Invalid Token',
  message: 'The login token is invalid or has expired',
  additional: 'Try logging in again to refresh the token',
}
