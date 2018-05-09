import React from 'react'

import DataTable from './DataTable'

const MINES_BASE_ROUTE = 'mines'
const MINES_PAYLOAD_VALUE = 'mines'

class MinesSearch extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)

    // match these up with the api query params to make it easier to generate
    // the query when we are searching
    this.queryableParams = [
      'mineId',
      'mineName',
      'mineLocationName',
      'permiteeCompanyCode',
      'regionCode',
      'mineTypeCode',
      'mineStatusCode',
    ]

    this.state = {
      mineId: '',
      mineName: '',
      mineLocationName: '',
      permiteeCompanyCode: '',
      regionCode: '',
      mineTypeCode: '',
      mineStatusCode: '',
      route: null,
    }
  }

  onInputChange(param) {
    return (evt) => {
      this.setState({
        [param]: evt.target.value,
      })
    }
  }

  onSubmit(evt) {
    evt.preventDefault()
    this.setState({
      route: this.getRoute(),
    })
  }

  getValidParams() {
    const params = []
    this.queryableParams.forEach((param) => {
      const val = this.state[param]
      if (val) {
        params.push(`${param}=${val}`)
      }
    })
    return params
  }

  getRoute() {
    const params = this.getValidParams()
    if (params.length === 0) {
      return null
    }

    const lastIdx = params.length - 1
    const query = params.map((param, idx) => (
      idx === lastIdx ? param : `${param}&`
    ))

    return `${MINES_BASE_ROUTE}?${query}`
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12">

            <form className="form-horizontal" onSubmit={this.onSubmit}>

              <div className="form-group">
                <label className="col-lg-2 control-label" htmlFor="mineIdInput">Mine Id</label>
                <div className="col-lg-10">
                  <input id="mineIdInput" type="text" className="form-control" value={this.state.id} onChange={this.onInputChange('mineId')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-2 control-label" htmlFor="mineNameInput">Mine Name</label>
                <div className="col-lg-10">
                  <input id="mineNameInput" type="text" className="form-control" value={this.state.name} onChange={this.onInputChange('mineName')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-2 control-label" htmlFor="mineLocationNameInput">Mine Location Name</label>
                <div className="col-lg-10">
                  <input id="mineLocationNameInput" type="text" className="form-control" value={this.state.value} onChange={this.onInputChange('mineLocationName')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-2 control-label" htmlFor="minePermiteeCompanyCodeInput">Permitee Company Code</label>
                <div className="col-lg-10">
                  <input id="minePermiteeCompanyCodeInput" type="text" className="form-control" value={this.state.value} onChange={this.onInputChange('permiteeCompanyCode')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-2 control-label" htmlFor="mineRegionCodeInput">Mine Region Code</label>
                <div className="col-lg-10">
                  <input id="mineRegionCodeInput" type="text" className="form-control" value={this.state.value} onChange={this.onInputChange('regionCode')} />
                </div>
              </div>

              <div className="form-group">
                <div className="col-lg-10">
                  <button type="submit" className="button-primary">Query</button>
                </div>
              </div>

            </form>
          </div>
        </div>
        <div className="row">
          <DataTable route={this.state.route} payloadValue={MINES_PAYLOAD_VALUE} />
        </div>
      </div>
    )
  }
}

export default MinesSearch
