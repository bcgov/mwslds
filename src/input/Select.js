import React from 'react'
import PropTypes from 'prop-types'

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
}

const defaultProps = {
  data: [],
  prefix: null,
  disabled: null,
  multi: null,
  width: null,
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
  } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`

  return (
    <label className="control-label" htmlFor={inputId} style={{ width }}>
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
