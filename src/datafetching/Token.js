import React from 'react'
import base64 from 'base-64'

import currToken from './Secret'

import TOKEN_ROUTE from './Routes'

const TokenSingleton = {
  token: currToken,

  pendingPromises: [],

  loadToken(username, password) {
    const auth = base64.encode(`${username}:${password}`)

    const options = {
      headers: new Headers({
        Authorization: `Basic ${auth}`,
      }),
      mode: 'cors',
    }

    return fetch(TOKEN_ROUTE, options)
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText)
        }
        return resp.json()
      })
      .then((parsed) => {
        this.token = parsed.access_token
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
        this.pendingPromises.push({ resolve, reject })
        if (this.pendingPromises.length === 1) {
          this.loadToken()
        }
      }
      return new Promise(promise)
    }
    return Promise.resolve(this.token)
  },
}
TokenSingleton.getToken()

export default function withToken(Wrapped) {
  return class WithTokenHOC extends React.Component {
    constructor(props) {
      super(props)

      this.setToken()
    }

    setToken() {
      TokenSingleton.getToken()
        .then((token) => {
          this.setState({
            token,
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
