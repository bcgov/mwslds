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
      { name: 'mineId', inputGroup: 1 },
      { name: 'mineName', inputGroup: 1 },
      { name: 'mineLocationName', inputGroup: 1 },
      { name: 'permiteeCompanyCode', inputGroup: 2 },
      { name: 'regionCode', inputGroup: 2 },
      { name: 'mineTypeCode', inputGroup: 2 },
      { name: 'mineStatusCode', inputGroup: 2 },
      { name: 'underInvestigation', type: 'checkbox', inputGroup: 3 },
      { name: 'major', type: 'checkbox', inputGroup: 3 },
      { name: 'withIssues', type: 'checkbox', inputGroup: 3 },
      { name: 'limit', inputGroup: 2 },
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
    const inputs = []

    this.queryableParams.forEach((param) => {
      const { name, type, inputGroup } = param

      if (!inputs[inputGroup]) {
        inputs[inputGroup] = []
      }

      let input
      switch (type) {
        case 'checkbox':
          input = (
            <CheckboxInput
              key={name}
              name={name}
              value={!!this.state[name]}
              onChange={this.onCheckboxChange(name)}
              prefix={this.props.prefix}
            />
          )
          break
        default:
          input = (
            <TextInput
              key={name}
              name={name}
              value={this.state[name]}
              onChange={this.onInputChange(name)}
              prefix={this.props.prefix}
            />
          )
      }
      inputs[inputGroup].push(input)
    })

    return inputs.map((inputList, idx) => (
      <div key={idx} className="form-spacing">
        {inputList}
      </div>
    ))
  }

  render() {
    const disabled = !this.queryableParams.reduce((anyValid, param) => (
      anyValid || !!this.state[param.name]
    ), false)

    return (
      <div>
        <div className="row">
          <div className="container">
            <form onSubmit={this.onSubmit}>
              {this.renderInputs()}
              <div className="form-group">
                <button type="submit" className="btn btn-primary" disabled={disabled}>Query</button>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
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
