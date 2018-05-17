import React from 'react'
import base64 from 'base-64'

import currToken from './Secret'

const tokenRoute = 'https://i1api.nrs.gov.bc.ca/oauth2/v1/oauth/token?disableDeveloperFilter=true&grant_type=client_credentials&scope=MWSL_COMMONMINES_API.*'

let token = currToken

export function loadToken(username, password) {
  const auth = base64.encode(`${username}:${password}`)

  const options = {
    headers: new Headers({
      Authorization: `Basic ${auth}`,
    }),
    mode: 'cors',
  }

  fetch(tokenRoute, options)
    .then((resp) => {
      if (!resp.ok) {
        throw Error(resp.statusText)
      }
      return resp.json()
    })
    .then((parsed) => {
      token = parsed.access_token
    })
    .catch((error) => {
      console.log(error)
    })
}

export default function withToken(Wrapped) {
  return class WithTokenHOC extends React.Component {
    constructor(props) {
      super(props)

      if (!token) {
        loadToken()
      }

      this.state = {
        token,
      }
    }

    componentDidMount() {
      this.getToken()
    }

    getToken() {
      this.setState({
        token,
      })
    }

    render() {
      return <Wrapped {...this.state} {...this.props} />
    }
  }
}
