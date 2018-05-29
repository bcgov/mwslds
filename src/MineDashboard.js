import React from 'react'
import PropTypes from 'prop-types'

import './style'
import './MinesDashboard.css'

import NowStats from './NowStats'
import MineVisitStats from './MineVisitStats'
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
            <div className="col-sm-8 chart">
              <h2 className="title">Notices of Work Statistics 2017</h2>
              <NowStats />
            </div>
            <div className="col-sm-4 chart">
              <h2 className="title">Mine Visits Statistics 2017</h2>
              <MineVisitStats />
            </div>
          </div>
          <div className="row" />
          <div className="row">
            <h2 className="title">Notices of Work Requiring Goverment Action</h2>
            <GovDelayTable />
          </div>
        </div>
      </div>
    )
  }
}

MineDashboard.propTypes = propTypes

export default MineDashboard
