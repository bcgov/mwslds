import React from 'react'
import PropTypes from 'prop-types'

import MinesView from './MinesView'

const propTypes = {
  match: PropTypes.object.isRequired,
}

const defaultProps = {
}

const BASE_ROUTE = 'mines'

function MinesViewRoute(props) {
  const { mineId } = props.match.params

  const route = mineId ? `${BASE_ROUTE}/${mineId}` : null
  return (
    <MinesView route={route} {...props} />
  )
}

MinesViewRoute.propTypes = propTypes
MinesViewRoute.defaultProps = defaultProps

export default MinesViewRoute
