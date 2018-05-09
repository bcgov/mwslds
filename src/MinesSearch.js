import React from 'react'

import './MinesSearch.css'

import DataTable from './DataTable'
import TextInput from './TextInput'

const MINES_BASE_ROUTE = 'mines'
const MINES_PAYLOAD_VALUE = 'mines'

class MinesSearch extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    // match these up with the api query params to make it easier to generate
    // the query when we are searching
    this.queryableParams = [
      {
        name: 'mineId',
      },
      {
        name: 'mineName',
      },
      {
        name: 'mineLocationName',
      },
      {
        name: 'permiteeCompanyCode',
      },
      {
        name: 'regionCode',
      },
      {
        name: 'mineTypeCode',
      },
      {
        name: 'mineStatusCode',
      },
      {
        name: 'underInvestigation',
        type: 'boolean',
      },
      {
        name: 'major',
        type: 'boolean',
      },
      {
        name: 'withIssues',
        type: 'boolean',
      },
      {
        name: 'limit',
      },
    ]

    const state = { route: null }
    this.queryableParams.forEach((param) => { state[param.name] = '' })
    this.state = state
  }

  onInputChange(param) {
    return (evt) => {
      this.setState({
        [param]: evt.target.value,
      })
    }
  }

  onSubmit(evt) {
    evt.preventDefault()
    this.setState({
      route: this.getRoute(),
    })
  }

  getValidParams() {
    const params = []
    this.queryableParams.forEach((param) => {
      const val = this.state[param]
      if (val) {
        params.push(`${param}=${val}`)
      }
    })
    return params
  }

  getRoute() {
    const params = this.getValidParams()
    if (params.length === 0) {
      return null
    }

    const lastIdx = params.length - 1
    const query = params.reduce((partialQuery, param, idx) => {
      const sep = idx === lastIdx ? '' : '&'
      return `${partialQuery}${param}${sep}`
    }, '')

    return `${MINES_BASE_ROUTE}?${query}`
  }

  renderInputs() {
    return this.queryableParams.map((param) => {
      const { name, type } = param
      return (
        <TextInput
          key={name}
          name={name}
          value={this.state[name]}
          onChange={this.onInputChange(name)}
          type={type}
          prefix={this.props.prefix}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-4">
            <form className="form-horizontal" onSubmit={this.onSubmit}>
              {this.renderInputs()}
              <div className="form-group">
                <div className="col-lg-offset-4 col-lg-8">
                  <button type="submit" className="btn btn-primary">Query</button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-8 scroll one-screen">
            <DataTable route={this.state.route} payloadValue={MINES_PAYLOAD_VALUE} />
          </div>
        </div>
      </div>
    )
  }
}

export default MinesSearch
