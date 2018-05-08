import React from 'react'

import './bcgov_bootstrap'

import './App.css'

import Header from './Header'
import MinesSearch from './MinesSearch'
// import DangerousOccurrencesSearch from './DangerousOccurrencesSearch'
import InspectorsTable from './InspectorsTable'
// import MineStatusesTable from './MineStatusesTable'
// import MineNoticesTable from './MineNoticesTable'

const navitems = [
]

export default function App() {
  return (
    <div className="App">
      <Header title="React with bcgov Bootstrap!" items={navitems} />
      <div className="row">
        <div className="col-lg-6 scroll">
          <MinesSearch />
        </div>
        <div className="col-lg-6 scroll">
          <InspectorsTable />
        </div>
      </div>
    </div>
  )
}
