import React from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';

// console.log(store.getState())

const App = () => {
    console.log('You are running this application in ' + process.env.NODE_ENV);
    return (
        <div className="App">
          <AppRouter/>
        </div>
    );
}

export default App;
