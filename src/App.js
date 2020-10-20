import React, { Component } from 'react'
import BlogApp from './components/Posts';
import Login from './components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import SignUp from './components/SignUp';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Route exact path='/' component={Posts} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
        </Router>
      </>
    )
  }
}
export default App;