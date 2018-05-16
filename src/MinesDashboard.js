import React from 'react'
import PropTypes from 'prop-types'

// import { withRouter } from 'react-router-dom'

import './style'

import DataTable from './table/DataTable'
import MineStats from './MineStats'


const propTypes = {
  tableRoute: PropTypes.string,
  history: PropTypes.object.isRequired,
}

const defaultProps = {
  tableRoute: 'mines?limit=10',
}

function minesTransform(data) {
  return data && data.mines
}

class MinesDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.onRowClick = this.onRowClick.bind(this)
  }

  onRowClick(row) {
    const { id } = row
    const { history } = this.props
    const route = `/mine/${id}`
    history.push(route)
  }

  render() {
    return (
      <div>
        <div className="container">
          <MineStats />
        </div>
        <DataTable
          route={this.props.tableRoute}
          transform={minesTransform}
          onRowClick={this.onRowClick}
        />
      </div>
    )
  }
}

MinesDashboard.propTypes = propTypes
MinesDashboard.defaultProps = defaultProps

export default MinesDashboard
