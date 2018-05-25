import React from 'react'
import PropTypes from 'prop-types'

import { startCase } from 'lodash'

import '../style'

import withData from '../datafetching/DataLoader'
import withToken from '../datafetching/Token'

const propTypes = {
  data: PropTypes.object,
}

const defaultProps = {
  data: null,
}

function DetailDisplay(props) {
  const { data } = props

  if (!data) {
    return <div />
  }

  return (
    <form className="form-horizontal well well-sm" style={{ whiteSpace: 'normal', marginBottom: 0 }}>
      {
        Object.keys(data).map((key) => {
          const name = startCase(key)
          let val = data[key]

          if (val === null || val === undefined) {
            val = ''
          }

          return (
            <div key={key} className="form-group">
              <label className="col-sm-offset-1 col-sm-2">{name}</label>
              <div className="col-sm-8"><div className="form-control">{val.toString()}</div></div>
            </div>
          )
        })
      }
    </form>
  )
}

DetailDisplay.propTypes = propTypes
DetailDisplay.defaultProps = defaultProps

export default withToken(withData(DetailDisplay))
