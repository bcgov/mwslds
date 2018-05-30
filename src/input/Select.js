import React from 'react'
import PropTypes from 'prop-types'

import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

import VirtualSelect from 'react-virtualized-select'
import { startCase } from 'lodash'

import TetheredSelect from './TetheredSelect'

import '../style'
import './Select.css'

const propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  prefix: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  multi: PropTypes.bool,
  width: PropTypes.string,
  validationError: PropTypes.string,
}

const defaultProps = {
  name: '',
  title: null,
  value: undefined,
  data: [],
  prefix: null,
  disabled: null,
  readOnly: null,
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
    title,
    data,
    value,
    onChange,
    prefix,
    disabled,
    multi,
    width,
    validationError,
    readOnly,
  } = props

  const inputId = `${prefix || ''}${name}`

  return (
    <label className="control-label" htmlFor={inputId} style={{ width }}>
      {title || startCase(name)}
      <VirtualSelect
        value={value}
        className={validationError && 'has-error'}
        onChange={onChangeWrapper(onChange)}
        disabled={disabled || readOnly}
        multiple={multi}
        options={data}
        selectComponent={TetheredSelect}
      />
    </label>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
