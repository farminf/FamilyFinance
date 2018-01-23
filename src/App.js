import React from 'react';
import './App.css';
import AppRouter from './routers/AppRouter';
import {connect} from 'react-redux';
import UserErrors from './components/UserErrors'

// console.log(store.getState())

const App = ({errors}) => {
    console.log('You are running this application in ' + process.env.NODE_ENV + ' with parameters of ' + process.env.REACT_APP_ENV);
    return (
        <div className="App">
            {errors && <UserErrors errors={errors}/>}
            <AppRouter/>
        </div>
    );
}

export default connect(state => ({errors: state.errors}))(App);
