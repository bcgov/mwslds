import React from 'react'
import PropTypes from 'prop-types'

import './style'
import './MinesDashboard.css'

//import MineStats from './MineStats'
import NowStats from './NowStats'
import MineVisitStats from './MineVisitStats'
import MineTable from './mineTable'

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
            <div className="row"/>
            <div className="row">
                <h2>Government Action Required Notices of Work Application</h2>
                <MineTable />
            </div>
        </div>
      </div>
    )
  }
}

MineDashboard.propTypes = propTypes
MineDashboard.defaultProps = defaultProps

export default MineDashboard
