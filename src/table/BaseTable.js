import React from 'react'
import PropTypes from 'prop-types'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  data: PropTypes.array,
}

const defaultProps = {
  data: null,
}

function getHeaderCols(row) {
  return Object.keys(row).map(key => startCase(key))
}

function getHeader(row) {
  return getHeaderCols(row).map(header => (
    <th key={header}>{header}</th>
  ))
}

function getBodyCols(row) {
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
  return <tr key={key}>{data}</tr>
}

function getBody(data) {
  return data.map(row => getBodyCols(row))
}

function BaseTable(props) {
  const { data } = props
  let header
  let body

  if (data && data.length) {
    header = getHeader(data[0] || {})
    body = getBody(data)
  } else {
    header = <th>No Data</th>
    body = <tr />
  }

  return (
    <table className="table table-striped table-hover table-bordered">
      <thead className="thead">
        <tr>
          {header}
        </tr>
      </thead>
      <tbody>
        {body}
      </tbody>
    </table>
  )
}

BaseTable.propTypes = propTypes
BaseTable.defaultProps = defaultProps

export default BaseTable
