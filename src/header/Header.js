import React from 'react'
import PropTypes from 'prop-types'

import bclogo from '../style/images/gov3_bc_logo.png'

import '../style'

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.any),
}

const defaultProps = {
  title: '',
  children: [],
}

function Header(props) {
  const { title, children } = props

  return (
    <div id="header" style={{ height: '100px', width: '100%', position: 'absolute' }} >
      <div id="header-main" className="">
        <div id="header-main-row" className="row">
          <div id="logo" style={{ position: 'absolute' }}>
            <a href="https://www2.gov.bc.ca">
              <img src={bclogo} alt="B.C. Government Logo" />
            </a>
          </div>
          <div className="bcgov-title col" style={{ textAlign: 'center' }}>
            <h1>
              {title}
            </h1>
          </div>
          <nav id="navbar" className="collapse navbar navbar-collapse">
            <ul className="mr-auto navbar-nav">
              {children && children.map((ele, idx) => (
                <li key={idx}>{ele}</li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className="navigationRibbon row">
        <div className="col level2Navigation">
          {children}
        </div>
      </div>
    </div>
  )
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header
