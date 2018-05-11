import React from 'react'
import PropTypes from 'prop-types'

import './style'
import './MinesSearch.css'

import withToken from './datafetching/Token'

import Input from './input'

const propTypes = {
  token: PropTypes.string,
  columns: PropTypes.number,
}

const defaultProps = {
  token: null,
  columns: 1,
}

const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'

const ROUTE = '/mines'

class MinesCreate extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    this.inputParams = [
      'alias',
      'district',
      'major',
      'mineLocationName',
      'mineManager',
      'mineName',
      'mineStatusCode',
      'mineTypeCode',
      'permitteeCompanyCode',
      'regionCode',
      'underInvestigation',
      'withIssues',
    ]

    const state = {}
    this.inputParams.forEach((param) => { state[param] = '' })

    this.state = state
  }

  onInputChange(param) {
    return value => this.updateState(param, value)
  }

  onSubmit(evt) {
    evt.preventDefault()

    const { token } = this.props

    if (!this.validate() || !token) {
      return
    }

    const url = this.getUrl()
    const data = this.getPostData()

    const options = {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
      body: JSON.stringify(data),
      mode: 'cors',
    }

    fetch(url, options).then((resp) => {
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
  }

  getPostData() {
    const data = {}
    this.inputParams.forEach((param) => {
      const val = this.state[param]
      if (val) {
        data[param] = val
      }
    })
    return data
  }

  getUrl() {
    return `${BASE_URL}/${ROUTE}`
  }

  validate() {
    return true
  }

  updateState(param, value) {
    this.setState({
      [param]: value,
    })
  }

  renderInputs() {
    const inputGroups = []

    this.inputParams.forEach((param, idx) => {
      const group = Math.floor(idx / this.props.columns)
      const inputs = inputGroups[group] || []
      const width = Math.floor(100 / this.props.columns)
      inputs.push((
        <Input
          key={param}
          name={param}
          value={this.state[param]}
          onChange={this.onInputChange(param)}
          prefix={this.props.prefix}
          width={`${width}%`}
        />
      ))
      inputGroups[group] = inputs
    })

    return inputGroups.map((group, idx) => (
      <div key={idx} className="form-group form-spacing">
        {group}
      </div>
    ))
  }

  render() {
    const disabled = !this.validate()

    return (
      <div className="container">
        <form className="" onSubmit={this.onSubmit}>
          {this.renderInputs()}
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={disabled}>
              Create
            </button>
          </div>
        </form>
      </div>
    )
  }
}

MinesCreate.propTypes = propTypes
MinesCreate.defaultProps = defaultProps

export default withToken(MinesCreate)
