import React from 'react'
import PropTypes from 'prop-types'

import Details from '../details'

import { MINES_ROUTE } from '../datafetching/Routes'

const propTypes = {
  id: PropTypes.string.isRequired,
}
const defaultProps = {}

function MineTableDetails(props) {
  const { id } = props
  const route = `${MINES_ROUTE}/${id}`
  return (
    <Details route={route} />
  )
}

MineTableDetails.propTypes = propTypes
MineTableDetails.defaultProps = defaultProps

export default MineTableDetails
