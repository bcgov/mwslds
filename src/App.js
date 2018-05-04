import React from 'react'

// bcgov bootstrap styles
import 'bootstrap-theme/dist/css/bootstrap-theme.min.css'

import './App.css'

import Header from './Header'
import Table from './Table'
import Form from './Form'

const navitems = [
  { name: 'link1', href: '#' },
  { name: 'link2', href: '#' },
]

export default function App() {
  return (
    <div className="App">
      <Header title="React with bcgov Bootstrap!" items={navitems} />
      <div className="row">
        <div className="col-lg-12">
          <Table />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Form />
        </div>
      </div>
    </div>
  )
}
