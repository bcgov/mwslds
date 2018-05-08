import React from 'react'

const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'

export default function withData(Wrapped, route, payloadParam) {
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
      if (this.props.token !== prevProps.token) {
        this.loadData()
      }
    }

    getUrl() {
      return `${BASE_URL}/${route}`
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
        .then(resp => resp.json())
        .then((parsed) => {
          let data = parsed
          if (payloadParam) {
            data = parsed[payloadParam]
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
