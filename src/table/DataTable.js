import React from 'react'
import PropTypes from 'prop-types'

import PaginatedTable from './BootstrapTable'
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

  if (loading) {
    return <div className="text-center">Loading...</div>
  } else if (error) {
    return <div className="text-center">Error Fetching Data</div>
  }

  return <PaginatedTable data={data} {...otherProps} />
}


DataTable.propTypes = propTypes
DataTable.defaultProps = defaultProps

export default withToken(withData(withDataTransform(DataTable)))
