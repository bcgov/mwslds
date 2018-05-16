import React from 'react'
import PropTypes from 'prop-types'

import './style'

import DataTable from './table/DataTable'
import MineStats from './MineStats'


const propTypes = {}
const defaultProps = {}

const lastTenRoute = 'mines?limit=10'

function minesTransform(data) {
  return data && data.mines
}

function MinesDashboard() {
  return (
    <div>
      <div className="container">
        <MineStats />
      </div>
      <DataTable route={lastTenRoute} transform={minesTransform} />
    </div>
  )
}

MinesDashboard.propTypes = propTypes
MinesDashboard.defaultProps = defaultProps

export default MinesDashboard
