import React from 'react'
import PropTypes from 'prop-types'

import DataTable from '../table/DataTable'
import MineTableDetails from './MineTableDetails'
import MineTableSearchBar from './MineTableSearchBar'

import { minesTableTransform, minesUpdateTransform } from '../datatransform'

import { MINES_ROUTE } from '../datafetching/Routes'

const propTypes = {
  route: PropTypes.string,
}

const defaultProps = {
  route: MINES_ROUTE,
}

const columnLabels = {
  id: 'Mine No',
  mineName: 'Name',
  mineLocationName: 'Location',
}

function MineTable(props) {
  const { route } = props

  return (
    <DataTable
      columnLabels={columnLabels}
      route={route}
      transform={minesTableTransform}
      updateDataTransform={minesUpdateTransform}
      expandComponent={MineTableDetails}
      searchComponent={MineTableSearchBar}
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
