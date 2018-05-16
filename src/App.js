import React from 'react'

import './style'

import './App.css'

import Header from './header'
import Footer from './footer'
import MinesDashboard from './MinesDashboard'
import MinesSearch from './MinesSearch'
import MinesCreate from './MinesCreate'


const navitems = [
]

const testMine = {}
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
    <div className="App">
      <Header title="Mine Seeker" items={navitems} />
      <div id="main" className="template gov-container">
        <MinesDashboard />
        {/* <MinesCreate data={testMine} />
        <MinesSearch /> */}
      </div>
      <Footer />
    </div>
  )
}
