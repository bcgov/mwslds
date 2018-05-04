import React from 'react'

import bclogo from 'bootstrap-theme/dist/images/17_gov3_bc_logo.svg'
import bclogoSmall from 'bootstrap-theme/dist/images/01_gov3_bc_symbol.svg'

// import 'bootstrap-theme/dist/js/bootstrap.bundle'
import 'bootstrap-theme/dist/css/bootstrap-theme.min.css'

export default function Header(props) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="https://www2.gov.bc.ca">
            <img className="img-fluid d-none d-md-block" src={bclogo} width="152" height="55" alt="B.C. Government Logo" />
            <img className="img-fluid d-md-none" src={bclogoSmall} width="61" height="43" alt="B.C. Government Logo" />
          </a>
          <div className="navbar-brand">
            {props.title}
          </div>
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup" // TODO: dont use an id here
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {props.items && props.items.map(link => (
                <a key={link.name} className="nav-item nav-link" href={link.href}>{link.name}</a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
