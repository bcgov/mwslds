import React from 'react'

import token from './Secret'

export default function withToken(Wrapped) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        token: null,
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
