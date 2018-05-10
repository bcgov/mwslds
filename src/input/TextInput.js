import React from 'react'
import PropTypes from 'prop-types'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
}

const defaultProps = {
  prefix: null,
  disabled: null,
}

function TextInput(props) {
  const {
    name,
    value,
    onChange,
    prefix,
    disabled,
  } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`

  return (
    <label className="control-label" htmlFor={inputId}>
      {title}
      <input
        id={inputId}
        className="form-control"
        value={value}
        onChange={onChange}
        type="text"
        disabled={disabled}
      />
    </label>
  )
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput
