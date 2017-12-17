import React, { Component } from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';
import './firebase/firebase'




// console.log(store.getState())

class App extends Component {
  render() {
    
    return (
      <div className="App">
        <AppRouter/>
      </div>
    );
  }
}
console.log('You are running this application in ' + process.env.NODE_ENV);
export default App; 
