import React from 'react'

import './bcgov_bootstrap'

import './App.css'

import Header from './Header'
import MinesTable from './MinesTable'
import InspectorsTable from './InspectorsTable'
import MineStatusesTable from './MineStatusesTable'
import MineNoticesTable from './MineNoticesTable'

const navitems = [
]

export default function App() {
  return (
    <div className="App">
      <Header title="React with bcgov Bootstrap!" items={navitems} />
      <div className="row">
        <div className="col-lg-12">
          <MineNoticesTable />
        </div>
      </div>
    </div>
  )
}
