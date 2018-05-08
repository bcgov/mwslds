import React from 'react'

import BaseTable from './BaseTable'
import withData from './DataLoader'

export default function DataTable(props) {
  if (!props.route) {
    return <BaseTable />
  }
  const Table = withData(BaseTable, props.route, props.payloadValue)
  return <Table />
}
