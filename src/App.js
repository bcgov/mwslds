import React from 'react'

import './bcgov_bootstrap'

import './App.css'

import Header from './Header'
import MinesSearch from './MinesSearch'
// import DangerousOccurrencesSearch from './DangerousOccurrencesSearch'
// import InspectorsTable from './InspectorsTable'
// import MineStatusesTable from './MineStatusesTable'
// import MineNoticesTable from './MineNoticesTable'

const navitems = [
  {
    name: 'link1',
    href: '#',
  },
  {
    name: 'link2',
    href: '#',
  },
]

export default function App() {
  return (
    <div className="App">
      <Header title="React with bcgov Bootstrap!" items={navitems} />
      <div className="row">
        <div className="container col-lg-10">
          <MinesSearch />
        </div>
      </div>
    </div>
  )
}
