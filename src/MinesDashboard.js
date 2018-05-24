import React from 'react'
import PropTypes from 'prop-types'

import './style'

import MineStats from './MineStats'
import MineTable from './MineTable'

const propTypes = {
  tableRoute: PropTypes.string,
  history: PropTypes.object.isRequired,
}

const defaultProps = {
  tableRoute: 'mines?limit=10',
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
          <MineTable route={this.props.tableRoute} />
        </div>
      </div>
    )
  }
}

MinesDashboard.propTypes = propTypes
MinesDashboard.defaultProps = defaultProps

export default MinesDashboard
