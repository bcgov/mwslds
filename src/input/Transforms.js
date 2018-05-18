
export function selectTransform(param, value, name) {
  return (data) => {
    if (data) {
      return data[param].map(val => ({ value: val[value], label: val[name] }))
    }
    return null
  }
}

export function minesTransform(data) {
  if (data) {
    return data.mines
  }
  return null
}

export default {
  selectTransform,
  minesTransform,
}
