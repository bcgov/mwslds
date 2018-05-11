import React from 'react'
import PropTypes from 'prop-types'

import Select from './Select'
import withData from '../datafetching/DataLoader'
import withToken from '../datafetching/Token'

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  error: PropTypes.object,
}

const defaultProps = {
  data: null,
  loading: null,
  error: null,
}

function DataSelect(props) {
  const {
    loading,
    data,
    error,
    ...otherProps
  } = props

  if (loading) {
    return <Select data={['', 'loading...']} {...otherProps} />
  } else if (error) {
    return <Select data={['Error Fetching Data']} {...otherProps} disabled />
  }
  // expect prop type warning hnyaa, data[0] object instead of string
  const parsedData = [''].concat(data.map(val => val.code))
  return <Select data={parsedData} {...otherProps} />
}

DataSelect.propTypes = propTypes
DataSelect.defaultProps = defaultProps

export default withToken(withData(DataSelect))
