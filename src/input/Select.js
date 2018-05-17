import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
  multi: PropTypes.bool,
  width: PropTypes.string,
  error: PropTypes.string,
}

const defaultProps = {
  data: [],
  prefix: null,
  disabled: null,
  multi: null,
  width: null,
  error: null,
}

function onChangeWrapper(wrapped) {
  return evt => wrapped(evt.target.value)
}

function Select(props) {
  const {
    name,
    data,
    value,
    onChange,
    prefix,
    disabled,
    multi,
    width,
    error,
  } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`
  const labelClasses = classnames('control-label', error && 'has-error')

  return (
    <label className={labelClasses} htmlFor={inputId} style={{ width }}>
      {title}
      <select
        className="form-control"
        value={value}
        onChange={onChangeWrapper(onChange)}
        disabled={disabled}
        multiple={multi}
      >
        {
          data.map(item => (
            <option key={item}>{item}</option>
          ))
        }
      </select>
    </label>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
