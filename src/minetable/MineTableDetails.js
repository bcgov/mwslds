import React from 'react'
import PropTypes from 'prop-types'

import Details from '../details'

import { MINES_ROUTE } from '../datafetching/Routes'

const propTypes = {
  id: PropTypes.string.isRequired,
  updateTableData: PropTypes.func,
}
const defaultProps = {
  updateTableData: null,
}

function MineTableDetails(props) {
  const { id, updateTableData } = props
  const route = `${MINES_ROUTE}/${id}`
  return (
    <Details route={route} updateTableData={updateTableData} />
  )
}

MineTableDetails.propTypes = propTypes
MineTableDetails.defaultProps = defaultProps

export default MineTableDetails
