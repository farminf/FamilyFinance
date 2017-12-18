import React, { Component } from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';
import './firebase/firebase'




// console.log(store.getState())

class App extends Component {
  render() {
    console.log('You are running this application in ' + process.env.NODE_ENV);    
    return (
      <div className="App">
        <AppRouter/>
      </div>
    );
  }
}
export default App; 
