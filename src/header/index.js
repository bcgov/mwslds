import React from 'react'
import PropTypes from 'prop-types'

import bclogo from 'Gov-2.0-Bootstrap-Skeleton/dist/images/gov3_bc_logo.png'
import mobileOpen from 'Gov-2.0-Bootstrap-Skeleton/dist/images/menu-open-mobile.png'

import '../style'

function focusMenu() {
  /* globals $ */
  // TODO get rid of this jquery nastiness
  $('.menu-button').focus()
}

const propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
}

const defaultProps = {
  title: '',
  children: [],
}

function Header(props) {
  const { title, children } = props

  return (
    <div id="header">
      <div id="header-main" className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div id="header-main-row" className="row">
            <div className="col-sm-3 col-md-2 col-lg-2 header-main-left">
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
            <div className="col-sm-8 col-md-8 col-lg-6 hidden-xs">
              <div className="bcgov-title">
                <h1>
                  {title}
                </h1>
              </div>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                {children && children.map((ele, idx) => (
                  <li key={idx}>{ele}</li>
                ))}
              </ul>
            </div>
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
