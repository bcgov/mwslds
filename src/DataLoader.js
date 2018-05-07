import React from 'react'

const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'

const TOKEN = '31b6899c-a718-424e-ac3f-2c7c2731b3fd'

export default function withData(Wrapped, route) {
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

    getUrl() {
      return `${BASE_URL}/${route}`
    }

    loadData() {
      const token = this.props.token || TOKEN

      this.setState(() => ({
        loading: true,
        error: null,
        data: null,
      }))

      if (!token) {
        // load the token
      }

      const options = {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }

      const url = this.getUrl()

      fetch(url, options)
        .then(resp => resp.json())
        .then((data) => {
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
