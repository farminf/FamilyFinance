import React, {Component} from 'react';
import {Provider} from 'react-redux';
import './App.css';
import AppRouter from './routers/AppRouter';
import './firebase/firebase'
import configureStore from './store/configureStore';
import {showLogoutButton} from './actions/header'

// console.log(store.getState())
const store = configureStore();
store.dispatch(showLogoutButton({ isLogoutButton: true }));

class App extends Component {
  render() {
    console.log('You are running this application in ' + process.env.NODE_ENV);
    return (
      <Provider store={store}>
        <div className="App">
          <AppRouter/>
        </div>
      </Provider>
    );
  }
}
export default App;
