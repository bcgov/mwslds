import React from 'react'

import { startCase } from 'lodash'

import './bcgov_bootstrap'

export default function CheckboxInput(props) {
  const { name, value, onChange, prefix, disabled } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`

  return (
    <div className="form-group">
      <label className="col-lg-4 control-label" htmlFor={inputId}>
        {title}
      </label>
      <div className="col-lg-8">
        <input
          id={inputId}
          value={value}
          onChange={onChange}
          type="checkbox"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
