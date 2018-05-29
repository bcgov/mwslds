import React from 'react'

import MineTable from './minetable'

const propTypes = {}
const defaultProps = {}

function MineSearchRoute() {
  return (
    <div className="container">
      <div className="row description">
        <h3>Mine Search</h3>
        <p>
          Search for Mines by Id, Name, Alias, and Location using the textbox below.
          Advanced search options allow searching on data not displayed in the table.
          Clicking on a row shows more detailed information which can be updated
          directly from the table.
        </p>
      </div>
      <div className="row">
        <MineTable />
      </div>
    </div>
  )
}

MineSearchRoute.propTypes = propTypes
MineSearchRoute.defaultProps = defaultProps

export default MineSearchRoute
