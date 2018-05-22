import React from 'react'
import PropTypes from 'prop-types'

import PaginatedTable from './PaginatedTable'
import withData from '../datafetching/DataLoader'
import withDataTransform from '../datafetching/DataTransform'
import withToken from '../datafetching/Token'

const propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  error: PropTypes.object,
}

const defaultProps = {
  loading: null,
  data: null,
  error: null,
}

function DataTable(props) {
  const {
    loading,
    data,
    error,
    ...otherProps
  } = props
  let parsedData

  if (loading) {
    parsedData = [{ 'loading...': '' }]
  } else if (error) {
    parsedData = [{ 'errorFetchingData...': error.message }]
  } else {
    parsedData = data
  }

  return <PaginatedTable data={parsedData} {...otherProps} />
}


DataTable.propTypes = propTypes
DataTable.defaultProps = defaultProps

export default withToken(withData(withDataTransform(DataTable)))
