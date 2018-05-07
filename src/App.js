import React from 'react'

import './bcgov_bootstrap'

import './App.css'

import Header from './Header'
import BaseTable from './BaseTable'

const navitems = [
]

export default function App() {
  return (
    <div className="App">
      <Header title="React with bcgov Bootstrap!" items={navitems} />
      <div className="row">
        <div className="col-lg-12">
          <BaseTable dataValue="inspectors" />
        </div>
      </div>
    </div>
  )
}
