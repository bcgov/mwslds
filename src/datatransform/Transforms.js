
import { pick } from 'lodash'

export function payloadTransform(param) {
  return data => (data && data[param])
}

export function reduceObjectTransform(obj, fields) {
  return obj && pick(obj, fields)
}

export function reduceObjectArrayTransform(data, fields) {
  if (!data) {
    return null
  }
  return data.map(obj => reduceObjectTransform(obj, fields))
}

export function tableTransform(payloadName, displayFields) {
  const getDataArray = payloadTransform(payloadName)
  return data => reduceObjectArrayTransform(getDataArray(data), displayFields)
}

export function selectTransform(payloadName, valueName, displayName) {
  const getDataArray = payloadTransform(payloadName)
  const transformObj = val => ({ value: val[valueName], label: val[displayName] })
  return (data) => {
    const dataArray = getDataArray(data)
    if (dataArray) {
      return dataArray.map(transformObj)
    }
    return null
  }
}

export function minesCountTransform(data) {
  if (data) {
    return data.mines.length
  }
  return null
}

export function govDelaysTransform(data) {
  const transform = tableTransform('governmentDelays', ['id', 'pauseDate', 'reason', 'notes'])
  return transform(data)
}

export function minesTableTransform(data) {
  const transform = tableTransform('mines', ['id', 'mineName', 'alias', 'mineLocationName'])
  return transform(data)
}

export function minesUpdateTransform(data, row) {
  const { mines } = data
  const toUpdate = mines.findIndex(mine => (mine.id === row.id))

  mines[toUpdate] = Object.assign(mines[toUpdate], row)
  // we want to return a new data object
  return {
    mines,
  }
}

export default {
  payloadTransform,
  reduceObjectTransform,
  reduceObjectArrayTransform,
  selectTransform,
  tableTransform,
  minesCountTransform,
  minesTableTransform,
  govDelaysTransform,
}
