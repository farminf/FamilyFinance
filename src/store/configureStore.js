import { createStore , combineReducers , applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';

// import all the reducers
import authReducer from '../reducers/auth';
import accountsReducer from '../reducers/accounts';
import transactionsReducer from '../reducers/transactions';
import categoriesReducer from '../reducers/categories';
import filtersReducer from '../reducers/filters';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {

    const store = createStore (
        combineReducers({
            auth : authReducer,
            accounts: accountsReducer,
            transactions: transactionsReducer,
            categories: categoriesReducer,
            filters: filtersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))        
    );

    return store;
};
