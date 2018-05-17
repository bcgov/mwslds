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
  width: PropTypes.string,
  error: PropTypes.string,
}

const defaultProps = {
  prefix: null,
  disabled: null,
  width: null,
  error: null,
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
    error,
  } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`
  const labelClasses = classnames('control-label', error && 'has-error')

  return (
    <label className={labelClasses} htmlFor={inputId} style={{ width }}>
      <input
        id={inputId}
        checked={value}
        onChange={onChangeWrapper(onChange)}
        type="checkbox"
        disabled={disabled}
        style={{ marginRight: '3px' }}
      />
      {title}
    </label>
  )
}

CheckboxInput.propTypes = propTypes
CheckboxInput.defaultProps = defaultProps

export default CheckboxInput
