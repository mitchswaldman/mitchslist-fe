import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import PostDetailScreen from './screens/PostDetailScreen'
import AboutScreen from './screens/AboutScreen'
import Screen404 from './screens/Screen404'
import LoginScreen from './screens/LoginScreen'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Switch>
          <Route path="/post/:id" component={PostDetailScreen}/>
          <Route path="/search" component={SearchScreen}/>
          <Route path="/about" component={AboutScreen}/>
          <Route path="/login" component={LoginScreen}/>
          <Route exact path="/" component={HomeScreen}/>
          <Route path="/" component={Screen404}/>
        </Switch>
      </div>
    );
  }
}

export default App;
