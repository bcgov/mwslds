import React from 'react'
import PropTypes from 'prop-types'

import MinesCreate from './MinesCreate'

const propTypes = {
  match: PropTypes.object.isRequired,
}

const defaultProps = {
}

const BASE_ROUTE = 'mines'

function MinesView(props) {
  const { mineId } = props.match.params

  const route = mineId ? `${BASE_ROUTE}/${mineId}` : null
  return (
    <MinesCreate route={route} {...props} />
  )
}

MinesView.propTypes = propTypes
MinesView.defaultProps = defaultProps

export default MinesView
