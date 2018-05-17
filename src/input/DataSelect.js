import React from 'react'
import PropTypes from 'prop-types'

import Select from './Select'
import withData from '../datafetching/DataLoader'
import withDataTransform from '../datafetching/DataTransform'
import withToken from '../datafetching/Token'

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
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
      displayData = [this.props.value || 'loading...']
    } else if (error) {
      displayData = [this.props.value || 'Error Fetching Data']
    } else {
      displayData = [''].concat(data)
    }
    return <Select data={displayData} {...otherProps} disabled={loading || !!error} />
  }
}

DataSelect.propTypes = propTypes
DataSelect.defaultProps = defaultProps

export default withToken(withData(withDataTransform(DataSelect)))
