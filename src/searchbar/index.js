import React from 'react'
import PropTypes from 'prop-types'

import Input from '../input'

const propTypes = {
  onFilter: PropTypes.func,
  onSearch: PropTypes.func,
  prefix: PropTypes.string,
  filters: PropTypes.arrayOf(PropTypes.object),
}

const defaultProps = {
  onFilter: undefined,
  onSearch: undefined,
  prefix: null,
  filters: [],
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.onFilter = this.onFilter.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.onShowAdvancedToggle = this.onShowAdvancedToggle.bind(this)

    const state = {
      main: '',
      showAdvanced: false,
    }

    props.filters.forEach((param) => { state[param.name] = '' })
    this.state = state
  }

  onInputChange(param) {
    return (value) => {
      this.updateState(param, value)

      const params = this.getValidParams()
      // have to set the new value here as updateState happens async.
      // also, inputs of 0 work here as we get the string "0"... cheeky!
      if (!value) {
        delete params[param]
      } else {
        params[param] = value
      }

      this.props.onFilter(params)
    }
  }

  onFilter(evt) {
    evt.preventDefault()
    const params = this.getValidParams()
    this.props.onFilter(params)
  }

  onSearch() {
    this.props.onSearch(this.state.main)
  }

  onShowAdvancedToggle() {
    this.setState(prevState => ({
      showAdvanced: !prevState.showAdvanced,
    }))
  }

  getValidParams() {
    const params = {}
    this.props.filters.forEach((param) => {
      const val = this.state[param.name]
      if (val) {
        params[param.name] = val
      }
    })
    return params
  }

  updateState(param, value) {
    this.setState({
      [param]: value,
    })
  }

  renderMainInput() {
    return (
      <div className="form-group form-main form-line input-group">
        <Input
          name=""
          type="text"
          value={undefined} // dont control this input
          onChange={this.props.onSearch}
          prefix={this.props.prefix}
          placeholder="Search"
          width="88%"
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
    const { prefix } = this.props

    this.props.filters.forEach((param) => {
      const {
        name,
        inputGroup,
        main,
        ...otherParams
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
          value={this.state[name]}
          onChange={this.onInputChange(name)}
          prefix={prefix}
          {...otherParams}
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
    return (
      <form onSubmit={evt => evt.preventDefault()}>
        {this.renderMainInput()}
        {this.state.showAdvanced && this.renderSubInputs()}
      </form>
    )
  }
}

SearchBar.propTypes = propTypes
SearchBar.defaultProps = defaultProps

export default SearchBar
