import React from 'react'
import PropTypes from 'prop-types'

import './style'
import './MinesDashboard.css'

import NowStats from './NowStats'
import GovDelayTable from './GovDelayTable'

const propTypes = {
  history: PropTypes.object.isRequired,
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
          <div className="row">
            <div className="chart">
              <h2 className="title_chart">Notices of Work Statistics</h2>
              <NowStats />
            </div>

          </div>
          <div className="row">
            <h2 className="title">Notices of Work Requiring Government Action</h2>
            <GovDelayTable />
          </div>
        </div>
      </div>
    )
  }
}

MineDashboard.propTypes = propTypes

export default MineDashboard
