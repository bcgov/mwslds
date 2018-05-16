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
}

const defaultProps = {
  data: null,
  loading: null,
  error: null,
  value: null,
  route: null,
}

class DataSelect extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.value === nextProps.value &&
      this.props.loading === nextProps.loading) {
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

    if (loading) {
      return <Select data={[this.props.value || '', 'loading...']} {...otherProps} />
    } else if (error) {
      return <Select data={[this.props.value || 'Error Fetching Data']} {...otherProps} disabled />
    }
    const parsedData = [''].concat(data)
    return <Select data={parsedData} {...otherProps} />
  }
}

DataSelect.propTypes = propTypes
DataSelect.defaultProps = defaultProps

export default withToken(withData(withDataTransform(DataSelect)))
