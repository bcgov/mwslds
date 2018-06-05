import React from 'react'
import PropTypes from 'prop-types'

import Select from './Select'
import withData from '../datafetching/DataLoader'
import withDataTransform from '../datatransform'
import withToken from '../datafetching/Token'

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.object,
  value: PropTypes.string,
  route: PropTypes.string,
  validationError: PropTypes.string,
}

const defaultProps = {
  data: null,
  loading: null,
  error: null,
  value: null,
  route: null,
  validationError: null,
}

class DataSelect extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.data !== nextProps.data) {
      return true
    }

    if (this.props.value === nextProps.value &&
      this.props.loading === nextProps.loading &&
      this.props.validationError === nextProps.validationError) {
      return false
    }
    return true
  }

  render() {
    const {
      loading,
      data,
      error,
      ...otherProps
    } = this.props

    let displayData
    if (loading) {
      displayData = [{ value: 'loading', label: 'loading...' }]
    } else if (error) {
      displayData = [{ value: 'error', label: 'Error Fetching Data' }]
    } else {
      displayData = data ? [{ value: '', label: '' }].concat(data) : null
    }
    return <Select data={displayData} {...otherProps} disabled={loading || !!error} />
  }
}

DataSelect.propTypes = propTypes
DataSelect.defaultProps = defaultProps

export { DataSelect as UnwrappedDataSelect }

export default withToken(withData(withDataTransform(DataSelect)))
