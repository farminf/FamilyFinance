import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import {showLogoutButton} from './actions/header'

const store = configureStore();
store.dispatch(showLogoutButton({ isLogoutButton: true }));

const jsx = (
    <Provider store={store}>
         <App />
    </Provider>
);


ReactDOM.render(jsx , document.getElementById('root'));
registerServiceWorker();
