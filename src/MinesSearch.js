import React from 'react'
import PropTypes from 'prop-types'

import './MinesSearch.css'

import DataTable from './table/DataTable'
import TextInput from './input/TextInput'
import CheckboxInput from './input/CheckboxInput'

const MINES_BASE_ROUTE = 'mines'
const MINES_PAYLOAD_VALUE = 'mines'

const propTypes = {
  prefix: PropTypes.string,
}

const defaultProps = {
  prefix: null,
}

class MinesSearch extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    this.queryableParams = [
      { name: 'mineId' },
      { name: 'mineName' },
      { name: 'mineLocationName' },
      { name: 'permiteeCompanyCode' },
      { name: 'regionCode' },
      { name: 'mineTypeCode' },
      { name: 'mineStatusCode' },
      { name: 'underInvestigation', type: 'checkbox' },
      { name: 'major', type: 'checkbox' },
      { name: 'withIssues', type: 'checkbox' },
      { name: 'limit' },
    ]

    const state = { route: null }
    this.queryableParams.forEach((param) => { state[param.name] = '' })
    this.state = state
  }

  onInputChange(param) {
    return evt => this.updateState(param, evt.target.value)
  }

  onCheckboxChange(param) {
    return evt => this.updateState(param, evt.target.checked)
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
      const val = this.state[param.name]
      if (val) {
        params.push(`${param.name}=${val}`)
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

  updateState(param, value) {
    this.setState({
      [param]: value,
    })
  }

  renderInputs() {
    return this.queryableParams.map((param) => {
      const { name, type } = param

      switch (type) {
        case 'checkbox':
          return (
            <CheckboxInput
              key={name}
              name={name}
              value={this.state[name]}
              onChange={this.onCheckboxChange(name)}
              prefix={this.props.prefix}
            />
          )
        default:
          return (
            <TextInput
              key={name}
              name={name}
              value={this.state[name]}
              onChange={this.onInputChange(name)}
              prefix={this.props.prefix}
            />
          )
      }
    })
  }

  render() {
    const disabled = !this.queryableParams.reduce((anyValid, param) => (
      anyValid || !!this.state[param.name]
    ), false)

    return (
      <div>
        <div className="row">
          <div className="col-lg-4">
            <form className="form-horizontal" onSubmit={this.onSubmit}>
              {this.renderInputs()}
              <div className="form-group">
                <div className="col-lg-offset-4 col-lg-8">
                  <button type="submit" className="btn btn-primary" disabled={disabled}>Query</button>
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

MinesSearch.propTypes = propTypes
MinesSearch.defaultProps = defaultProps

export default MinesSearch
