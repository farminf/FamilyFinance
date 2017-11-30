import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import NotFoundPage from '../containers/NotFoundPage';
import HomePage from '../containers/HomePage';

const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={HomePage} exact={true} />        
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
  
  export default AppRouter;
  