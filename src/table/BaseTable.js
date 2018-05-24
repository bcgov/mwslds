import React from 'react'
import PropTypes from 'prop-types'

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { startCase } from 'lodash'

const propTypes = {
  data: PropTypes.array,
  keyField: PropTypes.string,
  onRowClick: PropTypes.func,
  expandComponent: PropTypes.func,
}

const defaultProps = {
  data: null,
  keyField: 'id',
  onRowClick: undefined,
  expandComponent: undefined,
}

class BaseTable extends React.Component {
  constructor(props) {
    super(props)

    this.expandRow = this.expandRow.bind(this)
  }

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

  expandRow(row) {
    const Component = this.props.expandComponent
    if (!Component) {
      return null
    }
    const { id } = row
    const route = `mines/${id}`
    return <Component route={route} />
  }

  render() {
    const { data, expandComponent } = this.props

    if (!data) {
      return <div className="text-center">No Data</div>
    }

    const columns = this.getColumns()

    const options = {
      onRowClick: this.props.onRowClick,
    }

    const expandable = expandComponent ? () => true : () => false
    const expand = expandComponent ? this.expandRow : undefined

    return (
      <BootstrapTable
        data={data}
        options={options}
        expandableRow={expandable}
        expandComponent={expand}
        pagination
      >
        {columns}
      </BootstrapTable>
    )
  }
}

BaseTable.propTypes = propTypes
BaseTable.defaultProps = defaultProps

export default BaseTable
