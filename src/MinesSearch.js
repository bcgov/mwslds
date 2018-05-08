import React from 'react'

import DataTable from './DataTable'

const MINES_BASE_ROUTE = 'mines'
const MINES_PAYLOAD_VALUE = 'mines'

class DangerousOccurrencesSearch extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)

    this.state = {
      value: '',
    }
  }

  onChange(evt) {
    this.setState({
      value: evt.target.value,
    })
  }

  onSubmit() {
    this.setState({
      route: this.getRoute(),
    })
  }

  getRoute() {
    if (!this.state.value) {
      return null
    }
    return `${MINES_BASE_ROUTE}?regionCode=${this.state.value}`
  }

  render() {
    return (
      <div>
        <label htmlFor="regionCodeInput">
          RegionCode
          <input id="regionCodeInput" type="text" className="form-control" value={this.state.value} onChange={this.onChange} />
        </label>
        <DataTable route={this.state.route} payloadValue={MINES_PAYLOAD_VALUE} />
      </div>
    )
  }
}

export default DangerousOccurrencesSearch
