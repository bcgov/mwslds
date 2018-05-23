import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  data: PropTypes.array,
  onRowClick: PropTypes.func,
}

const defaultProps = {
  data: null,
  onRowClick: null,
}

class PaginatedTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      pageSize: 2,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.page !== nextState.page ||
      this.state.pageSize !== nextState.pageSize) {
      return true
    }

    if (this.props.data === nextProps.data) {
      return false
    }
    return true
  }

  onRowClickWrapper(row) {
    const { onRowClick } = this.props
    if (!onRowClick) {
      return null
    }
    return () => onRowClick(row)
  }

  onPageChangeWrapper(page) {
    return () => {
      this.setState({
        page,
      })
    }
  }

  getColumnNames(row) {
    return Object.keys(row).map(key => startCase(key))
  }

  renderHeader() {
    const { data } = this.props

    if (data && data.length) {
      const row = data[0]
      return this.getColumnNames(row).map(header => (
        <th key={header}>{header}</th>
      ))
    }
    return <th>No Data</th>
  }

  renderRow(row) {
    const data = Object.keys(row).map((key) => {
      const val = row[key]
      let parsed = val
      if (val instanceof Object) {
        // this is pretty hacky it assumes all objects have either a code or an id
        parsed = val.code || val.id || ''
      }
      return <td key={key}>{parsed && parsed.toString()}</td>
    })
    // try to use the id as a key... if it has one
    const key = row.id || null
    return <tr key={key} onClick={this.onRowClickWrapper(row)}>{data}</tr>
  }

  renderBody() {
    const { data } = this.props

    if (data && data.length) {
      const { page, pageSize } = this.state

      // page is 1 indexed so we want to use page - 1 to be the first array index
      const startIdx = (page - 1) * pageSize
      const stopIdx = page * pageSize

      const rows = []
      for (let idx = startIdx; idx < stopIdx && data[idx]; idx += 1) {
        rows.push(this.renderRow(data[idx]))
      }

      return rows
    }
    return <tr />
  }

  renderRowCountInfo() {
    const { data } = this.props
    const { page, pageSize } = this.state

    if (!data) {
      return null
    }

    return `Showing ${((page - 1) * pageSize) + 1} to ${page * pageSize} of ${data.length} rows`
  }

  renderPagination() {
    const { data } = this.props
    const { page, pageSize } = this.state

    if (!data || data.length <= pageSize) {
      return null
    }

    const pageButtons = []
    const pages = Math.ceil(data.length / pageSize)
    for (let idx = 1; idx <= pages; idx += 1) {
      const classes = classnames('paginate_button', idx === page ? 'active' : '')
      const button = (
        <li key={idx} className={classes}>
          <a onClick={this.onPageChangeWrapper(idx)} role="button">{idx}</a>
        </li>
      )
      pageButtons.push(button)
    }

    const prevDisabled = page === 1
    const nextDisabled = page === pages

    return (
      <ul className="pagination">
        <li className={classnames('paginate_button', prevDisabled && 'disabled')}>
          <a onClick={prevDisabled ? undefined : this.onPageChangeWrapper(page-1)} role="button">prev</a>
        </li>
        {pageButtons}
        <li className={classnames('paginate_button', nextDisabled && 'disabled')}>
          <a onClick={nextDisabled ? undefined : this.onPageChangeWrapper(page+1)} role="button">next</a>
        </li>
      </ul>
    )
  }

  render() {
    return (
      <div>
        <div style={{ overflow: 'auto' }}>
          <table className="table table-striped table-hover table-bordered">
            <thead className="thead">
              <tr>
                {this.renderHeader()}
              </tr>
            </thead>
            <tbody>
              {this.renderBody()}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-sm-5 dataTables_info">
            {this.renderRowCountInfo()}
          </div>
          <div className="col-sm-7 dataTables_paginate paging_simple_numbers">
            {this.renderPagination()}
          </div>
        </div>
      </div>
    )
  }
}

PaginatedTable.propTypes = propTypes
PaginatedTable.defaultProps = defaultProps

export default PaginatedTable
