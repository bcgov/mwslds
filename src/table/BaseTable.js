import React from 'react'
import PropTypes from 'prop-types'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  data: PropTypes.array,
  onRowClick: PropTypes.func,
}

const defaultProps = {
  data: null,
  onRowClick: null,
}

class BaseTable extends React.Component {
  onRowClickWrapper(row) {
    const { onRowClick } = this.props
    if (!onRowClick) {
      return null
    }
    return () => onRowClick(row)
  }

  getColumnNames(row) {
    return Object.keys(row).map(key => startCase(key))
  }

  renderHeader(data) {
    if (data && data.length) {
      const row = data[0]
      return this.getColumnNames(row).map(header => (
        <th key={header}>{header}</th>
      ))
    }
    return <th>No Data</th>
  }

  renderRow(row) {
    const data = Object.keys(row).map((key) => {
      const val = row[key]
      let parsed = val
      if (val instanceof Object) {
        // this is pretty hacky it assumes all objects have either a code or an id
        parsed = val.code || val.id || ''
      }
      return <td key={key}>{parsed}</td>
    })
    // try to use the id as a key... if it has one
    const key = row.id || null
    return <tr key={key} onClick={this.onRowClickWrapper(row)}>{data}</tr>
  }

  renderBody(data) {
    if (data && data.length) {
      return data.map(row => this.renderRow(row))
    }
    return <tr />
  }

  render() {
    const { data } = this.props

    return (
      <table className="table table-striped table-hover table-bordered">
        <thead className="thead">
          <tr>
            {this.renderHeader(data)}
          </tr>
        </thead>
        <tbody>
          {this.renderBody(data)}
        </tbody>
      </table>
    )
  }
}

BaseTable.propTypes = propTypes
BaseTable.defaultProps = defaultProps

export default BaseTable
