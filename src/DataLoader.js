import React from 'react'

const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'

export default function withData(Wrapped) {
  return class extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        data: null,
        loading: true,
        error: null,
      }
    }

    componentDidMount() {
      this.loadData()
    }

    componentDidUpdate(prevProps) {
      if (this.props.token !== prevProps.token ||
          this.props.route !== prevProps.route) {
        this.loadData()
      }
    }

    getUrl() {
      return `${BASE_URL}/${this.props.route}`
    }

    loadData() {
      const { token } = this.props

      if (!token) {
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

      fetch(url, options)
        .then((resp) => {
          if (!resp.ok) {
            throw Error(resp.statusText)
          }
          return resp.json()
        })
        .then((parsed) => {
          let data = parsed
          const { payloadValue } = this.props
          if (payloadValue) {
            data = parsed[payloadValue]
          }
          this.setState({
            data,
            loading: false,
          })
        })
        .catch((error) => {
          this.setState({
            error,
            loading: false,
          })
        })
    }

    render() {
      return <Wrapped {...this.props} {...this.state} />
    }
  }
}
