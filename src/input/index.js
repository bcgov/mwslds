import React from 'react'
import PropTypes from 'prop-types'

import Checkbox from './Checkbox'
import TextInput from './TextInput'
import DataSelect from './DataSelect'
import Select from './Select'

const propTypes = {
  type: PropTypes.string,
  value: PropTypes.any,
}

const defaultProps = {
  type: 'text',
  value: undefined,
}

function Input(props) {
  const { type, value, ...otherProps } = props

  switch (type) {
    case 'checkbox':
      return (
        <Checkbox
          value={!!value}
          {...otherProps}
        />
      )
    case 'data-select':
      return (
        <DataSelect
          value={value}
          {...otherProps}
        />
      )
    case 'select':
      return (
        <Select
          value={value}
          {...otherProps}
        />
      )
    default:
      return (
        <TextInput
          value={value}
          {...otherProps}
        />
      )
  }
}

Input.propTypes = propTypes
Input.defaultProps = defaultProps

export default Input
