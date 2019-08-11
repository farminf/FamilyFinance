import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { createBrowserHistory as createHistory } from "history";
import NotFoundPage from "../containers/NotFoundPage";
import HomePage from "../containers/HomePage";
import Dashboard from "../containers/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AccountsContainer from "../containers/Accounts";
import TransactionsContainer from "../containers/Transactions";
import CategoriesContainer from "../containers/Categories";
import EditAccountContainer from "../containers/EditAccount";
import EditTransactionContainer from "../containers/EditTransaction";
// import Footer from '../components/Footer'

export const history = createHistory();

const AppRouter = props => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={HomePage} exact={true} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute
            path="/accounts"
            component={AccountsContainer}
            exact={true}
          />
          <PrivateRoute
            path="/transactions"
            component={TransactionsContainer}
            exact={true}
          />
          <PrivateRoute
            path="/categories"
            component={CategoriesContainer}
            exact={true}
          />
          <PrivateRoute
            path="/accounts/edit/:name"
            component={EditAccountContainer}
          />
          <PrivateRoute
            path="/transactions/edit/:id"
            component={EditTransactionContainer}
          />

          <Route component={NotFoundPage} />
        </Switch>
        {/*<Footer />*/}
      </div>
    </Router>
  );
};

export default AppRouter;
