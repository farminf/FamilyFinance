import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {firebase} from './firebase/firebase';
import {history} from './routers/AppRouter';
import {login, logout} from './actions/auth';
import configureStore from './store/configureStore';
import './firebase/firebase'

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <App/>
    </Provider>

)

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        registerServiceWorker();
        hasRendered = true;
    }
};

ReactDOM.render(
    <p>Loading...</p>, document.getElementById('root'));

firebase
    .auth()
    .onAuthStateChanged((user) => {
        if (user) {
            store.dispatch(login({
                                    "uid": user.uid,
                                    "photoURL" : user.photoURL   
                                }));
            renderApp();
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
            // store.dispatch(startSetExpenses()).then(() => {   renderApp();   if
            // (history.location.pathname === '/') {     history.push('/dashboard');   } });
        } else {
            store.dispatch(logout());
            renderApp();
            history.push('/');
        }
    });
