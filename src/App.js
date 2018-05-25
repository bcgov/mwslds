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

  render() {
    return (
      <Router>
        <div className="App">
          <Header title="Mine Seeker">
            <Link to="/">Home</Link>
            <Link to="/mine">Create</Link>
            <Link to="/search">Search</Link>
          </Header>
          <div id="main" className="template gov-container">
            <div className="container">
              {
                this.state.message &&
                <MessageDisplay {...this.state.message} onDismiss={this.onMessageDismiss} />
              }
            </div>
            <Switch>
              <Route exact path="/" component={this.dashboard} />
              <Route path="/mine/:mineId" component={this.specificView} />
              <Route path="/mine" component={this.view} />
              <Route path="/search" component={this.search} />
              <Route component={this.notFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}
