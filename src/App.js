import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import decode from 'jwt-decode'

import './style'
import './App.css'

import Header from './header'
import Footer from './footer'
import MineDashboard from './MineDashboard'
import MineSearchRoute from './MineSearchRoute'
import MineViewRoute from './MineViewRoute'
import MessageDisplay from './message'

import { LOGIN_URL } from './datafetching/Routes'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.updateMessage = this.updateMessage.bind(this)
    this.onMessageDismiss = this.onMessageDismiss.bind(this)

    this.dashboard = otherProps => (
      <MineDashboard {...otherProps} displayMessage={this.updateMessage} />
    )
    // specificView and view need to be separate functions. we dont actually
    // want them to be the same component or state gets muddled between them
    this.specificView = otherProps => (
      <MineViewRoute {...otherProps} displayMessage={this.updateMessage} />
    )
    this.view = otherProps => (
      <MineViewRoute {...otherProps} displayMessage={this.updateMessage} />
    )
    this.search = otherProps => (
      <MineSearchRoute {...otherProps} displayMessage={this.updateMessage} />
    )
    this.notFound = () => (<h2 className="container">There is nothing here!</h2>)

    this.state = {
      message: null,
    }
  }

  onMessageDismiss() {
    this.updateMessage(null)
  }

  getUser() {
    // try to use the url to see if we are auth
    const { hash } = window.location
    let user = this.parseToken(hash)
    if (!user) {
      // fallback to using browser storage
      const storage = window.sessionStorage.getItem('token')
      user = this.parseToken(storage)
    }
    return user
  }

  parseToken(data) {
    if (data) {
      const match = data.match(/access_token=[^&]*/)
      if (match) {
        // there is an annoying jQuery parsing error if we dont remove stuff
        // after the hash. also it makes the uri easier to read
        window.location.hash = ''
        const token = match[0].split('=')[1]
        const verified = this.verifyToken(token)
        if (verified) {
          window.sessionStorage.setItem('token', `access_token=${token}`)
        }
        return verified
      }
    }
    return false
  }

  verifyToken(token) {
    const data = decode(token)
    // dont really know the best way to verify the token
    const valid = (
      data.cid === 'DMOD_UI' &&
      data.client_id === 'DMOD_UI' &&
      data.sub &&
      data.user_guid &&
      data.user_id.startsWith('IDIR')
    )

    return valid ? data : null
  }

  updateMessage(message) {
    this.setState({ message })
  }

  render() {
    const loggedIn = this.getUser()

    if (!loggedIn) {
      const currentUrl = window.location.origin
      const authUrl = `${LOGIN_URL}&redirect_uri=${currentUrl}`
      window.location = authUrl
    }

    return (
      <Router>
        <div className="App">
          <Header title="Mine Seeker">
            {loggedIn && <Link to="/">Dashboard</Link>}
            {loggedIn && <Link to="/mine">Create</Link>}
            {loggedIn && <Link to="/search">Search</Link>}
          </Header>
          <div id="main" className="template gov-container">
            <div className="container">
              {
                this.state.message &&
                <MessageDisplay {...this.state.message} onDismiss={this.onMessageDismiss} />
              }
            </div>
            {
              loggedIn && (
                <Switch>
                  <Route exact path="/" component={this.dashboard} />
                  <Route path="/mine/:mineId" component={this.specificView} />
                  <Route path="/mine" component={this.view} />
                  <Route path="/search" component={this.search} />
                  <Route component={this.notFound} />
                </Switch>
              )
            }
            {!loggedIn && <div className="text-center"><h3>Redirecting to Login</h3></div>}
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}
