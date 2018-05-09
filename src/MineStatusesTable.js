import React from 'react'

import DataTable from './DataTable'

const route = 'minestatuses'
const payloadValue = 'mineStatuses'

export default function () {
  return <DataTable route={route} payloadValue={payloadValue} />
}
