import React from "react";
import "./App.css";
import AppRouter from "./routers/AppRouter";
import { connect } from "react-redux";
import UserErrors from "./components/UserErrors";
import { withStyles } from "material-ui/styles";

// console.log(store.getState())
const styles = theme => ({
  root: theme.typography.button,
  textAlign: "center"
});

const App = ({ errors, classes }) => {
  console.log(
    "You are running this application in " +
      process.env.NODE_ENV +
      " with parameters of " +
      process.env.REACT_APP_ENV
  );
  return (
    <div className={classes.root + " App"}>
      {errors && <UserErrors errors={errors} />}
      <AppRouter />
    </div>
  );
};

export default withStyles(styles)(
  connect(state => ({ errors: state.errors }))(App)
);
