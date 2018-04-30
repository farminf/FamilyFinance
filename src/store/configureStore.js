import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// import all the reducers
import authReducer from "../reducers/auth";
import accountsReducer from "../reducers/accounts";
import transactionsReducer from "../reducers/transactions";
import categoriesReducer from "../reducers/categories";
import filtersReducer from "../reducers/filters";
import errorsReducer from "../reducers/errors";
import defaultReducers from "../reducers/defaultReducers";
import demoReducers from "../reducers/demo";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      accounts: accountsReducer,
      transactions: transactionsReducer,
      categories: categoriesReducer,
      filters: filtersReducer,
      errors: errorsReducer,
      defaultReducers: defaultReducers,
      demoReducers: demoReducers
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
