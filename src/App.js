import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

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

  updateMessage(message) {
    this.setState({ message })
  }

  isLoggedIn() {
    const { hash } = window.location
    if (hash) {
      const match = hash.match(/access_token=[^&]*/)
      if (match) {
        window.location.hash = ''
        // need to actually validate the token to make this do anything useful
        // right now this just checks if the uri contains any token...
        return true
      }
    }
    return false
  }

  render() {
    const isLoggedIn = this.isLoggedIn()

    if (!isLoggedIn) {
      const currentUrl = window.location.origin
      const authUrl = `${LOGIN_URL}&redirect_uri=${currentUrl}`
      window.location = authUrl
    }

    return (
      <Router>
        <div className="App">
          <Header title="Mine Seeker">
            {isLoggedIn && <Link to="/">Dashboard</Link>}
            {isLoggedIn && <Link to="/mine">Create</Link>}
            {isLoggedIn && <Link to="/search">Search</Link>}
          </Header>
          <div id="main" className="template gov-container">
            <div className="container">
              {
                this.state.message &&
                <MessageDisplay {...this.state.message} onDismiss={this.onMessageDismiss} />
              }
            </div>
            {
              isLoggedIn && (
                <Switch>
                  <Route exact path="/" component={this.dashboard} />
                  <Route path="/mine/:mineId" component={this.specificView} />
                  <Route path="/mine" component={this.view} />
                  <Route path="/search" component={this.search} />
                  <Route component={this.notFound} />
                </Switch>
              )
            }
            {!isLoggedIn && <div className="text-center"><h3>Redirecting to Login</h3></div>}
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}
