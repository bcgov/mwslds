import React from 'react'

import { startCase } from 'lodash'

import './bcgov_bootstrap'
import withData from './DataLoader'

function getHeaderCols(row) {
  return Object.keys(row).map(key => startCase(key))
}

function getHeader(row) {
  return getHeaderCols(row).map(header => (
    <th key={header}>{header}</th>
  ))
}

function getBodyCols(row) {
  return <tr>{Object.values(row).map(val => <td>{val}</td>)}</tr>
}

function getBody(data) {
  return data.map(row => getBodyCols(row))
}

function BaseTable(props) {
  let header
  let body
  const data = props.data && props.data[props.dataValue]

  if (props.loading) {
    header = <th>Loading ...</th>
    body = <tr />
  } else if (data) {
    header = getHeader(data[0])
    body = getBody(data)
  } else {
    header = <th>No Data</th>
    body = <tr />
  }

  return (
    <table className="table table-striped table-hover table-bordered">
      <thead className="thead-dark">
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

export default withData(BaseTable, 'inspectors?regionCode=1')
