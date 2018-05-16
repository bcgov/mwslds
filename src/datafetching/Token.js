import React from 'react'

import currToken from './Secret'

const token = currToken

export default function withToken(Wrapped) {
  return class WithTokenHOC extends React.Component {
    constructor(props) {
      super(props)
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
