import React from 'react'
import PropTypes from 'prop-types'

import MineTable from './MineTable'

const propTypes = {
}

const defaultProps = {
}

function MinesSearchRoute() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <MineTable />
        </div>
      </div>
    </div>
  )
}

MinesSearchRoute.propTypes = propTypes
MinesSearchRoute.defaultProps = defaultProps

export default MinesSearchRoute
