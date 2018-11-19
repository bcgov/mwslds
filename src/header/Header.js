import React from 'react'
import PropTypes from 'prop-types'

import bclogo from '../style/images/gov3_bc_logo.png'
import mobileOpen from '../style/images/menu-open-mobile.png'

import '../style'

function focusMenu() {
  /* globals $ */
  // TODO get rid of this jquery nastiness
  $('.menu-button').focus()
}

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
    <div id="header" style={{ height: '100px', width: '100%' }} >
      <div id="header-main" style={{ height: '100px', width: '100%' }} className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div id="header-main-row" className="row">
            <div className="col header-main-left">
              <div id="logo">
                <a href="https://www2.gov.bc.ca">
                  <img src={bclogo} alt="B.C. Government Logo" />
                </a>
              </div>
              <div id="access">
                <ul>
                  <li aria-label="Keyboard Tab Skip">
                    <a href="#main-content-anchor" aria-label="Skip to main content">Skip to main content</a>
                  </li>
                  <li aria-label="Keyboard Tab Skip">
                    <a href="#main-content-anchor" onClick={focusMenu} aria-label="Skip to navigation">Skip to navigation</a>
                  </li>
                  <li aria-label="Keyboard Tab Skip">
                    <a href="http://gov.bc.ca/webaccessibility/" aria-label="Accessibility Statement">Accessibility Statement</a>
                  </li>
                </ul>
              </div>
              <button type="button" className="navbar-toggle gov-button-custom collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="true" aria-label="Burger Navigation">
                <img src={mobileOpen} alt="Open Menu" />
              </button>
            </div>
            <div className="col hidden-xs">
              <div className="bcgov-title">
                <h1>
                  {title}
                </h1>
              </div>
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
        <div className="navigationRibbon">
          <div className="level2Navigation">
            <div className="container">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = propTypes
Header.defaultProps = defaultProps

export default Header
