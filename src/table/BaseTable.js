import React from 'react'
import PropTypes from 'prop-types'

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

import { startCase } from 'lodash'

const propTypes = {
  data: PropTypes.array,
  keyField: PropTypes.string,
  columnLabels: PropTypes.object,
  onRowClick: PropTypes.func,
  expandComponent: PropTypes.func,
  searchComponent: PropTypes.func,
  updateFilter: PropTypes.func,
  updateData: PropTypes.func,
}

const defaultProps = {
  data: null,
  keyField: 'id',
  columnLabels: {},
  onRowClick: undefined,
  expandComponent: undefined,
  searchComponent: undefined,
  updateFilter: undefined,
  updateData: undefined,
}

class BaseTable extends React.Component {
  constructor(props) {
    super(props)

    this.expandRow = this.expandRow.bind(this)
    this.toolBar = this.toolBar.bind(this)
    this.searchPanel = this.searchPanel.bind(this)
  }

  getColumns() {
    const { data, keyField, columnLabels } = this.props

    if (!data || !data.length) {
      // return the last set of columns we had or a single column
      return this.lastColumns || (
        <TableHeaderColumn isKey dataField="none">No Data</TableHeaderColumn>
      )
    }
    const row = data[0]

    const columns = Object.keys(row).map(name => (
      <TableHeaderColumn key={name} isKey={name === keyField} dataField={name}>
        {columnLabels[name] || startCase(name)}
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

    return (
      <Component
        {...row}
        updateTableData={this.props.updateData}
      />
    )
  }

  expandCol({ isExpandableRow, isExpanded }) {
    let content = ''

    if (isExpandableRow) {
      content = isExpanded ? '-' : '+'
    }
    return (
      <div className="text-center">{content}</div>
    )
  }

  toolBar(props) {
    return (
      <div className="col-sm-12">
        {props.components.searchPanel}
      </div>
    )
  }

  searchPanel(props) {
    const Component = this.props.searchComponent
    if (!Component) {
      return null
    }

    return <Component onSearch={props.search} onFilter={this.props.updateFilter} />
  }

  render() {
    const { data, expandComponent, searchComponent } = this.props

    const columns = this.getColumns()

    const options = {
      onRowClick: this.props.onRowClick,
      paginationShowsTotal: true,
    }


    if (searchComponent) {
      options.toolBar = this.toolBar
      options.searchPanel = this.searchPanel
    }

    const expandable = expandComponent ? () => true : () => false
    const expand = expandComponent ? this.expandRow : undefined
    const expandOpts = {
      expandColumnVisible: !!expand,
      expandColumnComponent: this.expandCol,
    }
    const searchable = !!searchComponent

    return (
      <BootstrapTable
        data={data}
        options={options}
        expandableRow={expandable}
        expandComponent={expand}
        expandColumnOptions={expandOpts}
        pagination
        search={searchable}
      >
        {columns}
      </BootstrapTable>
    )
  }
}

BaseTable.propTypes = propTypes
BaseTable.defaultProps = defaultProps

export default BaseTable
