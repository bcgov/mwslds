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
      // ugly... issue is we want to filter after one part of transforming the data,
      // but the transform happens after the filter. These functions happen before
      // and after the filter and simply grab data.mines, then put the filter fesults
      // back into data.mines.  ... there is probably a better way to do this
      preFilter={data => data && data.mines}
      postFilter={data => ({ mines: data })}
    />
  )
}

MineTable.propTypes = propTypes
MineTable.defaultProps = defaultProps

export default MineTable
