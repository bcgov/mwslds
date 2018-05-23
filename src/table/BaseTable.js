import React from 'react'
import PropTypes from 'prop-types'

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { startCase } from 'lodash'

const propTypes = {
  data: PropTypes.array,
  keyField: PropTypes.string,
  onRowClick: PropTypes.func,
}

const defaultProps = {
  data: null,
  keyField: 'id',
  onRowClick: undefined,
}

class BaseTable extends React.Component {
  getColumns() {
    const { data, keyField } = this.props

    if (!data) {
      return null
    }
    const row = data[0]

    const columns = Object.keys(row).map(name => (
      <TableHeaderColumn key={name} isKey={name === keyField} dataField={name}>
        {startCase(name)}
      </TableHeaderColumn>
    ))
    return columns
  }

  render() {
    const { data } = this.props

    if (!data) {
      return <div className="text-center">No Data</div>
    }

    const columns = this.getColumns()

    const options = {
      onRowClick: this.props.onRowClick,
    }

    return (
      <BootstrapTable data={data} options={options} pagination>
        {columns}
      </BootstrapTable>
    )
  }
}

BaseTable.propTypes = propTypes
BaseTable.defaultProps = defaultProps

export default BaseTable
