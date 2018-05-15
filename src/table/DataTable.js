import React from 'react'
import PropTypes from 'prop-types'

import BaseTable from './BaseTable'
import withData from '../datafetching/DataLoader'
import withDataTransform from '../datafetching/DataTransform'
import withToken from '../datafetching/Token'

const propTypes = {
  route: PropTypes.string,
}

const defaultProps = {
  route: null,
}

const WrappedTable = withToken(withData(withDataTransform(BaseTable)))

class DataTable extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.route === nextProps.route) {
      return false
    }
    return true
  }

  render() {
    if (!this.props.route) {
      return <BaseTable />
    }
    return <WrappedTable {...this.props} />
  }
}

DataTable.propTypes = propTypes
DataTable.defaultProps = defaultProps

export default DataTable
