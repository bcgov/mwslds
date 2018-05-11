import React from 'react'
import PropTypes from 'prop-types'

import CheckboxInput from './CheckboxInput'
import TextInput from './TextInput'
import DataSelect from './DataSelect'

const propTypes = {
  type: PropTypes.string,
  value: PropTypes.any.isRequired,
}

const defaultProps = {
  type: 'text',
}

function Input(props) {
  const { type, value, ...otherProps } = props

  switch (type) {
    case 'checkbox':
      return (
        <CheckboxInput
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
