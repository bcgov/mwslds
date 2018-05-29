import React from 'react'
import PropTypes from 'prop-types'

import MineView from './MineView'
import { MINES_ROUTE } from './datafetching/Routes'

const propTypes = {
  match: PropTypes.object.isRequired,
}

const defaultProps = {
}

function MineViewRoute(props) {
  const { mineId } = props.match.params

  const route = mineId ? `${MINES_ROUTE}/${mineId}` : null
  return (
    <div className="container">
      <div className="row description">
        <h3>Create Mine</h3>
        <p>
          Create a new mine. Required fields are highlighted in red if they are
          missing upon submission. Entered By and Entered Date are automatically populated.
        </p>
      </div>
      <div className="Row">
        <MineView route={route} {...props} />
      </div>
    </div>
  )
}

MineViewRoute.propTypes = propTypes
MineViewRoute.defaultProps = defaultProps

export default MineViewRoute
