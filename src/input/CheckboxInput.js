import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  width: PropTypes.string,
  validationError: PropTypes.string,
}

const defaultProps = {
  prefix: null,
  disabled: null,
  readOnly: null,
  width: null,
  validationError: null,
}

function onChangeWrapper(wrapped) {
  return evt => wrapped(evt.target.checked)
}

function CheckboxInput(props) {
  const {
    name,
    value,
    onChange,
    prefix,
    disabled,
    width,
    validationError,
    readOnly,
  } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`
  const labelClasses = classnames('control-label', validationError && 'has-error')

  return (
    <label className={labelClasses} htmlFor={inputId} style={{ width }}>
      <input
        id={inputId}
        checked={value}
        onChange={onChangeWrapper(onChange)}
        type="checkbox"
        disabled={disabled || readOnly}
        style={{ marginRight: '3px' }}
      />
      {title}
    </label>
  )
}

CheckboxInput.propTypes = propTypes
CheckboxInput.defaultProps = defaultProps

export default CheckboxInput
