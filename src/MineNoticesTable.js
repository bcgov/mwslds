import React from 'react'

import DataTable from './DataTable'

const route = 'minenotices?nowStatus=PENDING_APPROVAL'
const payloadValue = 'minesNotices'

export default function () {
  return <DataTable route={route} payloadValue={payloadValue} />
}
