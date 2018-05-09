import React from 'react'

import BaseTable from './BaseTable'
import withData from './DataLoader'
import withToken from './Token'

const WrappedTable = withToken(withData(BaseTable))

export default class DataTable extends React.Component {
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
