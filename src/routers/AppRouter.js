import React from 'react';
import { Route, Switch , Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../containers/NotFoundPage';
import HomePage from '../containers/HomePage';
import Dashboard from '../containers/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import AddAccountContainer from '../containers/Accounts';
import AddTransactionContainer from '../containers/Transactions';

export const history = createHistory();

const AppRouter = (props) => {
  return (
    <Router history={history}>
      <div>
        
        <Switch>
          <PublicRoute path="/" component={HomePage} exact={true}/>
          <PrivateRoute path="/dashboard" component={Dashboard}/>
          <PrivateRoute path="/accounts" component={AddAccountContainer}/> 
          <PrivateRoute path="/transactions" component={AddTransactionContainer}/>
          <PrivateRoute path="/accounts/edit/:id" component={Dashboard}/>         
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
