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
  children: PropTypes.element,
  width: PropTypes.string,
}

const defaultProps = {
  prefix: null,
  disabled: null,
  children: null,
  width: null,
}

function onChangeWrapper(wrapped) {
  return evt => wrapped(evt.target.value)
}

function TextInput(props) {
  const {
    name,
    value,
    onChange,
    prefix,
    disabled,
    width,
  } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`

  return (
    <label className="control-label" htmlFor={inputId} style={{ width }}>
      {title}
      <input
        id={inputId}
        className="form-control"
        value={value}
        onChange={onChangeWrapper(onChange)}
        type="text"
        disabled={disabled}
      />
      {props.children}
    </label>
  )
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput
