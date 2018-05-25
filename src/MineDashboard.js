import React from 'react'
import PropTypes from 'prop-types'

import './style'

import MineStats from './MineStats'
import MineTable from './minetable'

import { MINES_ROUTE } from './datafetching/Routes'

const propTypes = {
  tableRoute: PropTypes.string,
  history: PropTypes.object.isRequired,
}

const defaultProps = {
  tableRoute: `${MINES_ROUTE}?limit=10`,
}

class MineDashboard extends React.Component {
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
          <MineTable route={this.props.tableRoute} />
        </div>
      </div>
    )
  }
}

MineDashboard.propTypes = propTypes
MineDashboard.defaultProps = defaultProps

export default MineDashboard
