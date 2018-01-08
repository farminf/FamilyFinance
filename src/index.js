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
import './firebase/firebase';
import LoadProgress from './components/LoadProgress';
import {startSetTransactions} from './actions/transactions';
import {startSetAccounts} from './actions/accounts';
import {startSetCategories} from './actions/categories';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

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
    <LoadProgress/>, document.getElementById('root'));

firebase
    .auth()
    .onAuthStateChanged((user) => {
        if (user) {
            store.dispatch(login({"uid": user.uid, "photoURL": user.photoURL}));
            store
                .dispatch(startSetTransactions())
                .then(() => {
                    store
                        .dispatch(startSetAccounts())
                        .then(() => {
                            store
                                .dispatch(startSetCategories())
                                .then(() => {
                                    renderApp();
                                    if (history.location.pathname === '/') {
                                        history.push('/dashboard');
                                    }
                                });
                        });
                });

        } else {
            store.dispatch(logout());
            renderApp();
            history.push('/');
        }
    });
