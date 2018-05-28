import React from 'react'

import MineTable from './minetable'

const propTypes = {}
const defaultProps = {}

function MineSearchRoute() {
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

MineSearchRoute.propTypes = propTypes
MineSearchRoute.defaultProps = defaultProps

export default MineSearchRoute
