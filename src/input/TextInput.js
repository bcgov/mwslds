import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  children: PropTypes.element,
  width: PropTypes.string,
  validationError: PropTypes.string,
}

const defaultProps = {
  value: undefined,
  name: '',
  prefix: null,
  disabled: null,
  readOnly: null,
  children: null,
  width: null,
  validationError: null,
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
    readOnly,
    width,
    validationError,
  } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`
  const labelClasses = classnames('control-label', validationError && 'has-error')

  return (
    <label className={labelClasses} htmlFor={inputId} style={{ width }}>
      {title}
      <input
        id={inputId}
        className="form-control"
        value={value}
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
