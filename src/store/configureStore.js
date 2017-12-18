import { createStore , combineReducers , applyMiddleware , compose} from 'redux';
import thunk from 'redux-thunk';

// import all the reducers
import headerReducer from '../reducers/header';
import authReducer from '../reducers/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {

    const store = createStore (
        combineReducers({
            header : headerReducer,
            auth : authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))        
    );

    return store;
};
