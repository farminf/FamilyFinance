import React from 'react';
import { Route, Switch , Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NotFoundPage from '../containers/NotFoundPage';
import HomePage from '../containers/HomePage';
import Dashboard from '../containers/Dashboard';
import Header from '../components/Header';
import Constants from '../utils/constants';

export const history = createHistory();



const AppRouter = (props) => {
  return (
    <Router history={history}>
      <div>
        <Header title={Constants.APP_TITLE}/>
        <Switch>
          <Route path="/" component={HomePage} exact={true}/>
          <Route path="/dashboard" component={Dashboard} exact={true}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
