import React from 'react'
import PropTypes from 'prop-types'

import DataTable from './table/DataTable'
import Details from './details'
import { minesTableTransform } from './datatransform'

import { MINES_ROUTE } from './datafetching/Routes'

const propTypes = {
  route: PropTypes.string,
}

const defaultProps = {
  route: MINES_ROUTE,
}

function MineTable(props) {
  const { route } = props

  return (
    <DataTable
      route={route}
      transform={minesTableTransform}
      expandComponent={Details}
    />
  )
}

MineTable.propTypes = propTypes
MineTable.defaultProps = defaultProps

export default MineTable
