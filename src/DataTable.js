import React from 'react'

import BaseTable from './BaseTable'
import withData from './DataLoader'
import withToken from './Token'

export default function DataTable(props) {
  if (!props.route) {
    return <BaseTable />
  }
  const Table = withToken(withData(BaseTable, props.route, props.payloadValue))
  return <Table />
}
