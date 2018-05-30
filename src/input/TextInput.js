import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  children: PropTypes.element,
  width: PropTypes.string,
  validationError: PropTypes.string,
  placeholder: PropTypes.string,
}

const defaultProps = {
  value: undefined,
  name: '',
  title: null,
  prefix: null,
  disabled: null,
  readOnly: null,
  children: null,
  width: null,
  validationError: null,
  placeholder: undefined,
}

function onChangeWrapper(wrapped) {
  return evt => wrapped(evt.target.value)
}

function TextInput(props) {
  const {
    name,
    title,
    value,
    onChange,
    prefix,
    disabled,
    readOnly,
    width,
    validationError,
    placeholder,
  } = props

  const inputId = `${prefix || ''}${name}`
  const labelClasses = classnames('control-label', validationError && 'has-error')

  return (
    <label className={labelClasses} htmlFor={inputId} style={{ width }}>
      {title || startCase(name)}
      <input
        id={inputId}
        className="form-control"
        value={value}
        placeholder={placeholder}
        onChange={onChangeWrapper(onChange)}
        type="text"
        disabled={disabled}
        readOnly={readOnly}
      />
      {props.children}
    </label>
  )
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput
