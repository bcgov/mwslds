import React from 'react'

import './style'

import './App.css'

import Header from './header'
import Footer from './footer'
import MinesSearch from './MinesSearch'

const navitems = [
]

export default function App() {
  return (
    <div className="App">
      <Header title="Mine Seeker" items={navitems} />
      <div id="main" className="template gov-container">
        <MinesSearch />
      </div>
      <Footer />
    </div>
  )
}
