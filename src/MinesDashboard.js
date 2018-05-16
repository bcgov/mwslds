import React from 'react'
import PropTypes from 'prop-types'

import './style'

import DataTable from './table/DataTable'
import MineStats from './MineStats'


const propTypes = {
  tableRoute: PropTypes.string,
}

const defaultProps = {
  tableRoute: 'mines?limit=10',
}

function minesTransform(data) {
  return data && data.mines
}

function MinesDashboard(props) {
  return (
    <div>
      <div className="container">
        <MineStats />
      </div>
      <DataTable route={props.tableRoute} transform={minesTransform} />
    </div>
  )
}

MinesDashboard.propTypes = propTypes
MinesDashboard.defaultProps = defaultProps

export default MinesDashboard
