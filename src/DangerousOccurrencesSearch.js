import React from 'react'

import { tableWithData } from './BaseTable'

const BASE_ROUTE = 'dangerousoccurrences'
const PAYLOAD_VALUE = 'dangerousOccurrences'

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

  getRoute() {
    return `${BASE_ROUTE}?mineId=${this.state.value}`
  }

  render() {
    const route = this.getRoute()
    const Table = tableWithData(route, PAYLOAD_VALUE)

    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.onChange} />
        <Table />
      </div>
    )
  }
}

export default DangerousOccurrencesSearch
