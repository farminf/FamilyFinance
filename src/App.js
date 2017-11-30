import React, { Component } from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <AppRouter />
      </div>
    );
  }
}

export default App;
