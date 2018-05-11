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
}

const defaultProps = {
  data: [],
  prefix: null,
  disabled: null,
  multi: null,
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
  } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`

  return (
    <label className="control-label" htmlFor={inputId}>
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
