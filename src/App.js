import React from 'react'

import './bcgov_bootstrap'

import './App.css'

import Header from './Header'
import Footer from './Footer'
import MinesSearch from './MinesSearch'
// import DangerousOccurrencesSearch from './DangerousOccurrencesSearch'
// import InspectorsTable from './InspectorsTable'
// import MineStatusesTable from './MineStatusesTable'
// import MineNoticesTable from './MineNoticesTable'

const navitems = [
]

export default function App() {
  return (
    <div className="App">
      <Header title="Mine Seeker" items={navitems} />
      <div className="template gov-container shift-left">
        <MinesSearch />
      </div>
      <Footer />
    </div>
  )
}
