import React from 'react'
import PropTypes from 'prop-types'

import './style'
import './MinesSearch.css'

import withToken from './datafetching/Token'

import Input from './input'

const propTypes = {
  token: PropTypes.string,
  prefix: PropTypes.string,
}

const defaultProps = {
  token: null,
  prefix: null,
}

const BASE_URL = 'https://i1api.nrs.gov.bc.ca/mwsl-commonmines-api/v1'

const ROUTE = 'mines'

class MinesCreate extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    this.inputParams = [
      {
        name: 'mineName',
        inputGroup: 1,
        width: 33,
      },
      {
        name: 'alias',
        inputGroup: 1,
        width: 33,
      },
      {
        name: 'mineLocationName',
        inputGroup: 1,
        width: 33,
      },
      {
        name: 'district',
        inputGroup: 2,
        width: 33,
      },
      {
        name: 'mineManager',
        inputGroup: 2,
        width: 33,
      },
      {
        name: 'permitteeCompanyCode',
        inputGroup: 2,
        width: 33,
      },
      {
        name: 'regionCode',
        type: 'data-select',
        route: 'regions',
        payloadValue: 'regions',
        inputGroup: 3,
        width: 20,
      },
      {
        name: 'mineTypeCode',
        type: 'data-select',
        route: 'minetypes',
        payloadValue: 'mineTypes',
        inputGroup: 3,
        width: 20,
      },
      {
        name: 'mineStatusCode',
        type: 'data-select',
        route: 'minestatuses',
        payloadValue: 'mineStatuses',
        inputGroup: 3,
        width: 20,
      },
      {
        name: 'major',
        type: 'checkbox',
        inputGroup: 4,
      },
      {
        name: 'underInvestigation',
        type: 'checkbox',
        inputGroup: 4,
      },
      {
        name: 'withIssues',
        type: 'checkbox',
        inputGroup: 4,
      },
    ]

    const state = {}
    this.inputParams.forEach((param) => { state[param.name] = '' })

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
      if (!resp.ok) {
        throw Error(resp.statusText)
      }
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
  }

  getPostData() {
    const data = {}
    this.inputParams.forEach((param) => {
      const val = this.state[param.name]
      if (val) {
        data[param.name] = val
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

    this.inputParams.forEach((param) => {
      const {
        name,
        type,
        route,
        payloadValue,
        inputGroup,
        width,
      } = param
      const inputs = inputGroups[inputGroup] || []
      inputs.push((
        <Input
          key={name}
          name={name}
          type={type}
          route={route}
          payloadValue={payloadValue}
          value={this.state[name]}
          onChange={this.onInputChange(name)}
          prefix={this.props.prefix}
          width={width && `${width}%`}
        />
      ))
      inputGroups[inputGroup] = inputs
    })

    return inputGroups.map((group, idx) => (
      <div key={idx} className="input-group form-line form-spacing">
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
