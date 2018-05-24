import React from 'react'
import PropTypes from 'prop-types'

import './MinesSearch.css'

import MineTable from './MineTable'
import Input from './input'
import { selectTransform } from './input/Transforms'

import { MINES_ROUTE } from './datafetching/Routes'

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
    this.onShowAdvancedToggle = this.onShowAdvancedToggle.bind(this)

    this.queryableParams = [
      {
        name: 'mineId',
        inputGroup: 1,
        width: 33,
      },
      {
        name: 'mineName',
        main: true,
      },
      {
        name: 'mineLocationName',
        inputGroup: 1,
        width: 33,
      },
      {
        name: 'permitteeCompanyCode',
        type: 'data-select',
        route: 'companies',
        transform: selectTransform('companies', 'code', 'code'),
        inputGroup: 2,
        width: 20,
      },
      {
        name: 'regionCode',
        type: 'data-select',
        route: 'regions',
        transform: selectTransform('regions', 'code', 'code'),
        inputGroup: 2,
        width: 20,
      },
      {
        name: 'mineTypeCode',
        type: 'data-select',
        route: 'minetypes',
        transform: selectTransform('mineTypes', 'code', 'name'),
        inputGroup: 2,
        width: 20,
      },
      {
        name: 'mineStatusCode',
        type: 'data-select',
        route: 'minestatuses',
        transform: selectTransform('mineStatuses', 'code', 'name'),
        inputGroup: 2,
        width: 20,
      },
      {
        name: 'underInvestigation',
        type: 'checkbox',
        inputGroup: 3,
      },
      {
        name: 'major',
        type: 'checkbox',
        inputGroup: 3,
      },
      {
        name: 'withIssues',
        type: 'checkbox',
        inputGroup: 3,
      },
      {
        name: 'limit',
        inputGroup: 4,
        width: 5,
      },
    ]

    const state = {
      route: null,
      showAdvanced: false,
    }

    this.queryableParams.forEach((param) => { state[param.name] = '' })
    this.state = state
  }

  onInputChange(param) {
    return value => this.updateState(param, value)
  }

  onSubmit(evt) {
    evt.preventDefault()
    this.setState({
      route: this.getRoute(),
    })
  }

  onShowAdvancedToggle() {
    this.setState(prevState => ({
      showAdvanced: !prevState.showAdvanced,
    }))
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

    return `${MINES_ROUTE}?${query}`
  }

  updateState(param, value) {
    this.setState({
      [param]: value,
    })
  }

  renderMainInput() {
    const {
      name,
      type,
      route,
      transform,
    } = this.queryableParams.find(param => param.main)

    return (
      <div key={name} className="form-main form-line input-group">
        <Input
          name={name}
          type={type}
          value={this.state[name]}
          onChange={this.onInputChange(name)}
          route={route}
          transform={transform}
          prefix={this.props.prefix}
          width="89%"
        >
          <span className="form-inline">
            <button className="btn btn-default" type="button" onClick={this.onShowAdvancedToggle}>
              {this.state.showAdvanced ? 'Hide' : 'Show'} Advanced
            </button>
          </span>
        </Input>
      </div>
    )
  }

  renderSubInputs() {
    const inputs = []

    this.queryableParams.forEach((param) => {
      const {
        name,
        type,
        inputGroup,
        main,
        route,
        transform,
        width,
      } = param

      if (main) {
        return
      }

      if (!inputs[inputGroup]) {
        inputs[inputGroup] = []
      }

      const input = (
        <Input
          key={name}
          name={name}
          type={type}
          value={this.state[name]}
          onChange={this.onInputChange(name)}
          route={route}
          transform={transform}
          prefix={this.props.prefix}
          width={width && `${width}%`}
        />
      )

      inputs[inputGroup].push(input)
    })

    return inputs.map((inputList, idx) => (
      <div key={idx} className="input-group form-line form-spacing">
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
        <div className="container">
          <div className="row">
            <form onSubmit={this.onSubmit}>
              {this.renderMainInput()}
              {this.state.showAdvanced && this.renderSubInputs()}
              <div className="form-group">
                <button type="submit" className="btn btn-primary" disabled={disabled}>
                  Query
                </button>
              </div>
            </form>
          </div>
          <div className="row">
            <MineTable route={this.state.route} />
          </div>
        </div>
      </div>
    )
  }
}

MinesSearch.propTypes = propTypes
MinesSearch.defaultProps = defaultProps

export default MinesSearch
