import React from 'react'

import { startCase } from 'lodash'

import withData from './DataLoader'

import './bcgov_bootstrap'

function getHeaderCols(row) {
  return Object.keys(row).map(key => startCase(key))
}

function getHeader(row) {
  return getHeaderCols(row).map(header => (
    <th key={header}>{header}</th>
  ))
}

function getBodyCols(row) {
  const data = Object.values(row).map((val) => {
    let parsed = val
    if (val instanceof Object) {
      // this check is pretty hacky it assumes all objects have a code... which they might?
      parsed = val.code
    }
    return <td>{parsed}</td>
  })
  return <tr>{data}</tr>
}

function getBody(data) {
  return data.map(row => getBodyCols(row))
}

function BaseTable(props) {
  let header
  let body
  const { data, loading, error } = props

  if (loading) {
    header = <th>Loading ...</th>
    body = <tr />
  } else if (data && data.length) {
    header = getHeader(data[0] || {})
    body = getBody(data)
  } else if (error) {
    header = <th>Error Fetching Data</th>
    body = <tr><td>{error.message}</td></tr>
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

export default BaseTable

export function tableWithData(route, payloadValue) {
  return withData(BaseTable, route, payloadValue)
}
