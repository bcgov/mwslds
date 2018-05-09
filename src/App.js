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
      <div className="template container gov-container">
          <MinesSearch />
      </div>
      <Footer />
    </div>
  )
}
