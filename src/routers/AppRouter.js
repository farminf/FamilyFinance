import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFoundPage from '../containers/NotFoundPage';
import HomePage from '../containers/HomePage';
import Dashboard from '../containers/Dashboard';

const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={HomePage} exact={true} />
          <Route path="/dashboard" component={Dashboard} />          
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
  
  export default AppRouter;
  