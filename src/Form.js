import React from 'react'

import { Form, Text } from 'react-form'
import './bcgov_bootstrap'


const validate = value => ({
  error: value ? null : 'missing param',
  warning: value && value === 'sup' ? null : 'param isnt one',
  success: value ? 'we good' : null,
})

export default function SimpleForm() {
  return (
    <Form>
      {formApi => (
        <form onSubmit={formApi.onSubmit} id="sample-form">
          <fieldset>
            <div className="form-group">
              <label htmlFor="higuy">
                Entry
                <Text field="hi" id="higuy" validate={validate} />
                {/* <input type="email" className="formControl" id="higuy" /> */}
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </fieldset>
        </form>
      )}
    </Form>
  )
}
