import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import '../style'

import withData from '../datafetching/DataLoader'
import withToken, { invalidTokenMessage } from '../datafetching/Token'

import { BASE_URL, MINES_ROUTE } from '../datafetching/Routes'

import Input from '../input'

import MessageDisplay from '../message'

const propTypes = {
  token: PropTypes.string,
  prefix: PropTypes.string,
  data: PropTypes.object,
  updateData: PropTypes.func,
  updateTableData: PropTypes.func,
  detailFields: PropTypes.array,
  showUpdate: PropTypes.bool,
}

const defaultProps = {
  token: null,
  prefix: null,
  data: null,
  updateData: undefined,
  updateTableData: undefined,
  detailFields: null,
  showUpdate: false,
}

class DetailDisplay extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps
    if (data && data.id && !prevState.isUpdate) {
      // only update the state if we have data passed in and we are not yet
      // doing an update (aka. the values have not already been seen)
      const toUpdate = {
        isUpdate: true,
      }

      Object.keys(data).forEach((key) => {
        const val = data[key]
        // dont change values to undefined or null, react doesnt like those as values
        if (val !== null && val !== undefined) {
          toUpdate[key] = val
        }
      })
      return toUpdate
    }
    return null
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onMessageDismiss = this.onMessageDismiss.bind(this)

    this.inputParams = this.props.detailFields

    const { data } = this.props
    const state = {
      isUpdate: false,
      isSaving: false,
      message: null,
      // errors holds a map of input name -> error string
      errors: {},
    }
    this.inputParams.forEach((param) => {
      state[param.name] = (data && data[param.name]) || ''
    })

    this.state = state
  }

  onInputChange(param) {
    return value => this.updateState(param, value)
  }

  onUpdate(data) {
    const { updateData, updateTableData } = this.props

    if (updateData) {
      updateData(data)
    }
    if (updateTableData) {
      updateTableData(data)
    }
  }

  onSubmit(evt) {
    evt.preventDefault()

    const { token } = this.props

    if (!token) {
      this.onDisplayMessage(invalidTokenMessage)
      return
    }

    if (!this.isValid()) {
      return
    }

    const url = this.getUrl()
    const data = this.getData()
    const method = this.state.isUpdate ? 'PUT' : 'POST'

    const options = {
      method,
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }),
      body: JSON.stringify(data),
      mode: 'cors',
    }

    this.setState({
      message: null,
      isSaving: true,
    })

    fetch(url, options)
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText)
        }
        return resp.json()
      })
      .then((parsed) => {
        if (parsed.code && parsed.code === '0') {
          const { description } = parsed
          this.onDisplayMessage({
            type: 'success',
            title: 'Success!',
            message: description,
          })
          // need to place the id back into our data so we can find the correct
          // record when updating
          data.id = this.props.data.id
          this.onUpdate(data)

          this.setState({
            isSaving: false,
          })
        } else {
          throw Error(parsed.description)
        }
      })
      .catch((error) => {
        this.onDisplayMessage({
          type: 'danger',
          title: 'Something went wrong.',
          message: error.message,
        })
        this.setState({
          isSaving: false,
        })
      })
  }

  onMessageDismiss() {
    this.onDisplayMessage(null)
  }

  onDisplayMessage(message) {
    this.setState({ message })
  }

  getData() {
    const data = {}
    if (!this.state.isUpdate) {
      data.enteredBy = 'MWSL'
      const now = new Date()
      data.enteredDate = `${now.getFullYear()}/${now.getMonth()}/${now.getDay()}`
    }
    this.inputParams.forEach((param) => {
      const { name } = param
      data[name] = this.state[name]
    })
    return data
  }

  getUrl() {
    const updateRoute = this.state.isUpdate ? `/${this.props.data.id}` : ''
    return `${BASE_URL}/${MINES_ROUTE}${updateRoute}`
  }

  validate() {
    const errors = {}
    this.inputParams.forEach((param) => {
      const { name, validator } = param
      if (!validator) {
        // no validator so the param is valid
        return
      }

      const val = this.state[name]
      const { valid, msg } = validator(val)
      if (!valid) {
        errors[name] = msg
      }
    })

    this.setState({
      errors,
    })

    return errors
  }

  isValid() {
    return isEmpty(this.validate())
  }

  updateState(param, value) {
    this.setState({
      [param]: value,
    })
  }

  renderInputs() {
    const inputGroups = []
    const { errors } = this.state

    this.inputParams.forEach((param) => {
      const {
        name,
        type,
        route,
        transform,
        inputGroup,
        width,
        disabled,
      } = param
      const error = errors[name]
      const inputs = inputGroups[inputGroup] || []
      inputs.push((
        <Input
          key={name}
          name={name}
          type={type}
          route={route}
          transform={transform}
          value={this.state[name]}
          onChange={this.onInputChange(name)}
          prefix={this.props.prefix}
          width={width && `${width}%`}
          disabled={disabled}
          validationError={error}
        />
      ))
      inputGroups[inputGroup] = inputs
    })

    return inputGroups.map((group, idx) => (
      <div key={idx} className="input-group form-line form-spacing">
        {group}
      </div>
    ))
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className="form well well-sm"
        style={{ whiteSpace: 'normal', marginBottom: 0 }}
      >
        {this.renderInputs()}
        {
          this.state.message && (
            <div className="form-group" style={{ marginTop: '10px' }}>
              <MessageDisplay {...this.state.message} onDismiss={this.onMessageDismiss} />
            </div>
          )
        }
        {
          this.props.showUpdate && (
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={this.state.isSaving} style={{ marginTop: this.state.message ? 0 : '10px' }}>
                {this.state.isUpdate ? 'Update' : 'Create'}
              </button>
            </div>
          )
        }
      </form>
    )
  }
}

DetailDisplay.propTypes = propTypes
DetailDisplay.defaultProps = defaultProps

export default withToken(withData(DetailDisplay))
