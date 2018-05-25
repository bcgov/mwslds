import React from 'react'
import PropTypes from 'prop-types'

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { startCase } from 'lodash'

import SearchBar from '../SearchBar'

const propTypes = {
  data: PropTypes.array,
  keyField: PropTypes.string,
  onRowClick: PropTypes.func,
  expandComponent: PropTypes.func,
  updateFilter: PropTypes.func,
}

const defaultProps = {
  data: null,
  keyField: 'id',
  onRowClick: undefined,
  expandComponent: undefined,
  updateFilter: null,
}

class BaseTable extends React.Component {
  constructor(props) {
    super(props)

    this.expandRow = this.expandRow.bind(this)
    this.toolBar = this.toolBar.bind(this)
    this.searchPanel = this.searchPanel.bind(this)
  }

  getColumns() {
    const { data, keyField } = this.props

    if (!data || !data.length) {
      // return the last set of columns we had or a single column
      return this.lastColumns || (
        <TableHeaderColumn isKey dataField="none">No Data</TableHeaderColumn>
      )
    }
    const row = data[0]

    const columns = Object.keys(row).map(name => (
      <TableHeaderColumn key={name} isKey={name === keyField} dataField={name}>
        {startCase(name)}
      </TableHeaderColumn>
    ))

    // remember the last set of columns we rendered so if we filter down to no data
    // we can still display columns
    this.lastColumns = columns

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

  toolBar(props) {
    return (
      <div className="col-sm-12">
        {props.components.searchPanel}
      </div>
    )
  }

  searchPanel(props) {
    return <SearchBar onSearch={props.search} onFilter={this.props.updateFilter} />
  }

  render() {
    const { data, expandComponent } = this.props

    const columns = this.getColumns()

    const options = {
      onRowClick: this.props.onRowClick,
      paginationShowsTotal: true,
      toolBar: this.toolBar,
      searchPanel: this.searchPanel,
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
        search
      >
        {columns}
      </BootstrapTable>
    )
  }
}

BaseTable.propTypes = propTypes
BaseTable.defaultProps = defaultProps

export default BaseTable
