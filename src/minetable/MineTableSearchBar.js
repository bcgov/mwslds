import React from 'react'

import SearchBar from '../searchbar'

import { selectTransform } from '../datatransform'

const propTypes = {}
const defaultProps = {}

const filters = [
  {
    name: 'permitteeCompanyCode',
    title: 'Permittee Company',
    type: 'data-select',
    route: 'companies',
    transform: selectTransform('companies', 'code', 'name'),
    inputGroup: 1,
    width: '25%',
  },
  {
    name: 'regionCode',
    title: 'Region',
    type: 'data-select',
    route: 'regions',
    transform: selectTransform('regions', 'code', 'name'),
    inputGroup: 1,
    width: '25%',
  },
  {
    name: 'mineTypeCode',
    title: 'Mine Type',
    type: 'data-select',
    route: 'minetypes',
    transform: selectTransform('mineTypes', 'code', 'name'),
    inputGroup: 1,
    width: '25%',
  },
  {
    name: 'mineStatusCode',
    title: 'Mine Status',
    type: 'data-select',
    route: 'minestatuses',
    transform: selectTransform('mineStatuses', 'code', 'name'),
    inputGroup: 1,
    width: '25%',
  },
  {
    name: 'major',
    type: 'checkbox',
    inputGroup: 2,
  },
  {
    name: 'underInvestigation',
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
