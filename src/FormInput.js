import React from 'react'

import { startCase } from 'lodash'

import './bcgov_bootstrap'

export default function FormInput(props) {
  const { name, prefix, type, value, onChange } = props

  const title = startCase(name)
  const inputId = `${prefix || ''}${name}`
  const inputType = type || 'text'

  return (
    <div className="form-group">
      <label className="col-lg-4 control-label" htmlFor={inputId}>
        {title}
      </label>
      <div className="col-lg-8">
        <input
          id={inputId}
          type={inputType}
          className="form-control"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
