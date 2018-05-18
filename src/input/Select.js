import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { startCase } from 'lodash'

import '../style'

const propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
  multi: PropTypes.bool,
  width: PropTypes.string,
  validationError: PropTypes.string,
}

const defaultProps = {
  data: [],
  prefix: null,
  disabled: null,
  multi: null,
  width: null,
  validationError: null,
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
    validationError,
  } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`
  const labelClasses = classnames('control-label', validationError && 'has-error')

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
            item && <option key={item.value} value={item.value}>{item.name}</option>
          ))
        }
      </select>
    </label>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
