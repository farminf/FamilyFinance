import { createStore , combineReducers} from 'redux';
// import all the reducers
import headerReducer from '../reducers/header';


export default () => {

    const store = createStore (
        combineReducers({
            header : headerReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};
