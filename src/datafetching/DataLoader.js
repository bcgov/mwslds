import React from 'react'
import PropTypes from 'prop-types'

import cache from '../cache'

import { BASE_URL } from './Routes'

const propTypes = {
  token: PropTypes.string,
  route: PropTypes.string,
}

const defaultProps = {
  token: null,
  route: null,
}

function withData(Wrapped) {
  class WithDataHOC extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        data: null,
        error: null,
        loading: false,
      }
    }

    componentDidMount() {
      this.mounted = true
      this.loadData()
    }

    componentDidUpdate(prevProps) {
      if (this.props.token !== prevProps.token ||
          this.props.route !== prevProps.route) {
        this.loadData()
      }
    }

    componentWillUnmount() {
      this.mounted = false
    }

    getUrl() {
      return `${BASE_URL}/${this.props.route}`
    }

    loadData() {
      const { token, route } = this.props

      if (!token || !route) {
        return
      }

      this.setState(() => ({
        loading: true,
        error: null,
        data: null,
      }))

      const options = {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }

      const url = this.getUrl()

      const cached = cache.get(url)
      if (cached) {
        if (this.mounted) {
          this.setState({
            data: cached,
            loading: false,
          })
        }
        return
      }

      fetch(url, options)
        .then((resp) => {
          if (!resp.ok) {
            throw Error(resp.statusText)
          }
          return resp.json()
        })
        .then((parsed) => {
          cache.put(url, parsed)
          if (this.mounted) {
            this.setState({
              data: parsed,
              loading: false,
            })
          }
        })
        .catch((error) => {
          if (this.mounted) {
            this.setState({
              error,
              loading: false,
            })
          }
        })
    }

    render() {
      return <Wrapped {...this.props} {...this.state} />
    }
  }

  WithDataHOC.propTypes = propTypes
  WithDataHOC.defaultProps = defaultProps

  return WithDataHOC
}

export default withData
