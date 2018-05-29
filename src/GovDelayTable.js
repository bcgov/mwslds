import React from 'react'
import PropTypes from 'prop-types'

import DataTable from './table/DataTable'
import NowTableDetails from './NowTableDetails'
import { govDelaysTransform } from './datatransform'

import { GOVDELAY_ROUTE, NOTICESOFWORK_ROUTE } from './datafetching/Routes'

const propTypes = {
  route: PropTypes.string,
  clickRoute: PropTypes.string,
}

const defaultProps = {
  route: `${GOVDELAY_ROUTE}?activeOnly=true`,
  clickRoute: NOTICESOFWORK_ROUTE,
}

function GovDelayTable(props) {
  const { route } = props
  const { clickRoute } = props

  return (
    <DataTable
      route={route}
      transform={govDelaysTransform}
      expandComponent={NowTableDetails}
      onClickRoute={clickRoute}
      // ugly... issue is we want to filter after one part of transforming the data,
      // but the transform happens after the filter. These functions happen before
      // and after the filter and simply grab data.mines, then put the filter fesults
      // back into data.mines.  ... there is probably a better way to do this
      preFilter={data => data && data.governmentDelays}
      postFilter={data => ({ governmentDelays: data })}
    />
  )
}

GovDelayTable.propTypes = propTypes
GovDelayTable.defaultProps = defaultProps

export default GovDelayTable
