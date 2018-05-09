import React from 'react'

import DataTable from './DataTable'

const route = 'inspectors?regionCode=1'
const payloadValue = 'inspectors'

export default function () {
  return <DataTable route={route} payloadValue={payloadValue} />
}
