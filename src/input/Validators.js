
export function isRequired(val) {
  return {
    valid: !!val || val === 0,
    msg: 'required',
  }
}

export default {
  isRequired,
}
