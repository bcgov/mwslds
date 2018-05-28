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
    <MineView route={route} {...props} />
  )
}

MineViewRoute.propTypes = propTypes
MineViewRoute.defaultProps = defaultProps

export default MineViewRoute
