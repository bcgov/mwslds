import React from 'react'

import './MinesSearch.css'

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
      'limit',
    ]

    this.state = {
      mineId: '',
      mineName: '',
      mineLocationName: '',
      permiteeCompanyCode: '',
      regionCode: '',
      mineTypeCode: '',
      mineStatusCode: '',
      limit: '',
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
    const query = params.reduce((partialQuery, param, idx) => {
      const sep = idx === lastIdx ? '' : '&'
      return `${partialQuery}${param}${sep}`
    }, '')

    return `${MINES_BASE_ROUTE}?${query}`
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-6">

            <form className="form-horizontal" onSubmit={this.onSubmit}>

              <div className="form-group">
                <label className="col-lg-12 control-label" htmlFor="mineIdInput">Mine Id</label>
                <div className="col-lg-12">
                  <input id="mineIdInput" type="text" className="form-control" value={this.state.mineId} onChange={this.onInputChange('mineId')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-12 control-label" htmlFor="mineNameInput">Mine Name</label>
                <div className="col-lg-12">
                  <input id="mineNameInput" type="text" className="form-control" value={this.state.mineName} onChange={this.onInputChange('mineName')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-12 control-label" htmlFor="mineLocationNameInput">Mine Location Name</label>
                <div className="col-lg-12">
                  <input id="mineLocationNameInput" type="text" className="form-control" value={this.state.mineLocationName} onChange={this.onInputChange('mineLocationName')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-12 control-label" htmlFor="minePermiteeCompanyCodeInput">Permitee Company Code</label>
                <div className="col-lg-12">
                  <input id="minePermiteeCompanyCodeInput" type="text" className="form-control" value={this.state.permiteeCompanyCode} onChange={this.onInputChange('permiteeCompanyCode')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-12 control-label" htmlFor="mineRegionCodeInput">Mine Region Code</label>
                <div className="col-lg-12">
                  <input id="mineRegionCodeInput" type="text" className="form-control" value={this.state.regionCode} onChange={this.onInputChange('regionCode')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-12 control-label" htmlFor="mineTypeCodeInput">Mine Type Code</label>
                <div className="col-lg-12">
                  <input id="mineTypeCodeInput" type="text" className="form-control" value={this.state.mineTypeCode} onChange={this.onInputChange('mineTypeCode')} />
                </div>
              </div>

              <div className="form-group">
                <label className="col-lg-12 control-label" htmlFor="mineStatusCodeInput">Mine Status Code</label>
                <div className="col-lg-12">
                  <input id="mineStatusCodeInput" type="text" className="form-control" value={this.state.mineStatusCode} onChange={this.onInputChange('mineStatusCode')} />
                </div>
              </div>

              {/* <div className="form-group">
                <label className="col-lg-12 control-label" htmlFor="limitInput">Limit</label>
                <div className="col-lg-12">
                  <input id="limitInput" type="text" className="form-control" value={this.state.limit} onChange={this.onInputChange('limit')} />
                </div>
              </div> */}

              <div className="form-group">
                <div className="col-lg-10">
                  <button type="submit" className="button-primary">Query</button>
                </div>
              </div>

            </form>
          </div>
          <div className="col-lg-6 scroll one-screen">
            <DataTable route={this.state.route} payloadValue={MINES_PAYLOAD_VALUE} />
          </div>
        </div>
      </div>
    )
  }
}

export default MinesSearch
