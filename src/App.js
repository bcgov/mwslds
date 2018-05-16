import React from 'react'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './style'
import './App.css'

import Header from './header'
import Footer from './footer'
import MinesDashboard from './MinesDashboard'
import MinesSearch from './MinesSearch'
import MinesCreate from './MinesCreate'

// const testMine = {
//   id: '1621372',
//   alias: 'stm',
//   district: '9',
//   enteredDate: '2018/05/14',
//   enteredBy: 'MWSL',
//   feeStatus: 'Not Permitted',
//   major: false,
//   mineLocationName: 'testville',
//   mineManager: 'me',
//   mineName: 'stephens test mine',
//   mineStatusCode: 'H',
//   mineTypeCode: 'CU',
//   permitteeCompanyCode: '016434',
//   regionCode: '2',
//   underInvestigation: false,
//   withIssues: false,
// }

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
          <Route path="/mine" component={MinesCreate} />
          <Route path="/search" component={MinesSearch} />
        </div>
        <Footer />
      </div>
    </Router>
  )
}
