import React from 'react'
import PropTypes from 'prop-types'

import MinesView from './MinesView'
import { MINES_ROUTE } from './datafetching/Routes'

const propTypes = {
  match: PropTypes.object.isRequired,
}

const defaultProps = {
}

function MinesViewRoute(props) {
  const { mineId } = props.match.params

  const route = mineId ? `${MINES_ROUTE}/${mineId}` : null
  return (
    <MinesView route={route} {...props} />
  )
}

MinesViewRoute.propTypes = propTypes
MinesViewRoute.defaultProps = defaultProps

export default MinesViewRoute
