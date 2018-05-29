import React from 'react'
import PropTypes from 'prop-types'

import Details from './details'

import { NOTICESOFWORK_ROUTE } from './datafetching/Routes'
import { nowDetailField } from './NowDefinition'

const propTypes = {
  id: PropTypes.string.isRequired,
}
const defaultProps = {
}

function NowTableDetails(props) {
  const { id } = props
  const route = `${NOTICESOFWORK_ROUTE}/${id}`

  return (
    <Details
      route={route}
      detailFields={nowDetailField}
    />
  )
}

NowTableDetails.propTypes = propTypes
NowTableDetails.defaultProps = defaultProps

export default NowTableDetails
