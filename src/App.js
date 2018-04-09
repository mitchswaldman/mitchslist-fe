import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import PostDetailScreen from './screens/PostDetailScreen'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Switch>
          <Route path="/post/:id" component={PostDetailScreen}/>
          <Route path="/search" component={SearchScreen}/>
          <Route path="/" component={HomeScreen}/>
        </Switch>
      </div>
    );
  }
}

export default App;
