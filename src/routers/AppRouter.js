import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFoundPage from '../containers/NotFoundPage';
import HomePage from '../containers/HomePage';
import Dashboard from '../containers/Dashboard';
import Header from '../components/Header';
import Constants from '../utils/constants';



const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Header title={Constants.APP_TITLE}/>
        <Switch>
          <Route path="/" component={HomePage} exact={true}/>
          <Route path="/dashboard" component={Dashboard} exact={true}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
