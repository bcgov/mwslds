import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './style'
import './App.css'

import Header from './header'
import Footer from './footer'
import MinesDashboard from './MinesDashboard'
import MinesSearch from './MinesSearch'
import MinesView from './MinesView'

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header title="Mine Seeker">
          <Link to="/">Home</Link>
          <Link to="/mine">Create</Link>
          <Link to="/search">Search</Link>
        </Header>
        <div id="main" className="template gov-container">
          <Route exact path="/" component={MinesDashboard} />
          <Route path="/mine" component={MinesView} />
          <Route path="/mine/:mineId" component={MinesView} />
          <Route path="/search" component={MinesSearch} />
        </div>
        <Footer />
      </div>
    </Router>
  )
}
