import React from 'react'

import SearchBar from '../searchbar'

import { selectTransform } from '../datatransform'

const propTypes = {}
const defaultProps = {}

const filters = [
  {
    name: 'permitteeCompanyCode',
    type: 'data-select',
    route: 'companies',
    transform: selectTransform('companies', 'code', 'code'),
    inputGroup: 1,
    width: 20,
  },
  {
    name: 'regionCode',
    type: 'data-select',
    route: 'regions',
    transform: selectTransform('regions', 'code', 'code'),
    inputGroup: 1,
    width: 20,
  },
  {
    name: 'mineTypeCode',
    type: 'data-select',
    route: 'minetypes',
    transform: selectTransform('mineTypes', 'code', 'name'),
    inputGroup: 1,
    width: 20,
  },
  {
    name: 'mineStatusCode',
    type: 'data-select',
    route: 'minestatuses',
    transform: selectTransform('mineStatuses', 'code', 'name'),
    inputGroup: 1,
    width: 20,
  },
  {
    name: 'underInvestigation',
    type: 'checkbox',
    inputGroup: 2,
  },
  {
    name: 'major',
    type: 'checkbox',
    inputGroup: 2,
  },
  {
    name: 'withIssues',
    type: 'checkbox',
    inputGroup: 2,
  },
]

function MineTableSearchBar(props) {
  return (
    <SearchBar filters={filters} {...props} />
  )
}

MineTableSearchBar.propTypes = propTypes
MineTableSearchBar.defaultProps = defaultProps

export default MineTableSearchBar
