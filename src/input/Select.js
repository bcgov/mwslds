import React from 'react'
import PropTypes from 'prop-types'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

import VirtualSelect from 'react-virtualized-select'

import { startCase } from 'lodash'

import '../style'
import './Select.css'

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
  return selected => wrapped(selected ? selected.value : '')
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

  return (
    <label className="control-label" htmlFor={inputId} style={{ width }}>
      {title}
      <VirtualSelect
        value={value}
        className={validationError && 'has-error'}
        onChange={onChangeWrapper(onChange)}
        disabled={disabled}
        multiple={multi}
        options={data}
      />
    </label>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
