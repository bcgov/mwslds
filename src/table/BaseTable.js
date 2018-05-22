import React from 'react'
import PropTypes from 'prop-types'

import { startCase } from 'lodash'

import { Grid, ScrollSync } from 'react-virtualized'

import '../style'
import './BaseTable.css'

const propTypes = {
  data: PropTypes.array,
  onRowClick: PropTypes.func,
  placeholder: PropTypes.string,
}

const defaultProps = {
  data: null,
  onRowClick: null,
  placeholder: 'Nothing to display',
}

class BaseTable extends React.Component {
  constructor(props) {
    super(props)

    this.renderBodyCell = this.renderBodyCell.bind(this)
  }

  shouldComponentUpdate(nextProps) {
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

  getColumnNames(row) {
    return Object.keys(row).map(key => startCase(key))
  }

  renderHeaderCell(cols) {
    return (opts) => {
      const {
        columnIndex,
        key,
        style,
      } = opts
      const value = cols[columnIndex]
      return <div key={key} style={style}><strong>{value}</strong></div>
    }
  }

  renderBodyCell(opts) {
    const {
      columnIndex,
      key,
      rowIndex,
      style,
    } = opts
    const { data } = this.props

    const columnName = Object.keys(data[0])[columnIndex]
    const value = data[rowIndex][columnName]

    return (
      <div key={key} onClick={this.onRowClickWrapper(data[rowIndex])} style={style} role="presentation">
        {value && value.toString()}
      </div>
    )
  }

  render() {
    const { data, placeholder } = this.props

    if (!data) {
      return <div className="text-center">{placeholder}</div>
    }

    const columns = this.getColumnNames(data[0])

    const height = 400
    const width = 1000

    return (
      <ScrollSync>
        {({ onScroll, scrollLeft }) => (
          <div className="table">
            <div className="table-header">
              <Grid
                cellRenderer={this.renderHeaderCell(columns)}
                columnCount={columns.length}
                columnWidth={100}
                height={50}
                rowCount={1}
                rowHeight={50}
                width={width}
                scrollLeft={scrollLeft}
              />
            </div>
            <div className="table-body">
              <Grid
                cellRenderer={this.renderBodyCell}
                columnCount={columns.length}
                columnWidth={100}
                height={height}
                rowCount={data.length}
                rowHeight={60}
                width={width}
                onScroll={onScroll}
              />
            </div>
          </div>
        )}
      </ScrollSync>
    )
  }
}

BaseTable.propTypes = propTypes
BaseTable.defaultProps = defaultProps

export default BaseTable
