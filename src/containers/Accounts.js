import React from "react";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Constants from "../utils/constants";
import AccountForm from "../components/AccountForm";
import { connect } from "react-redux";
import { startAddAccount } from "../actions/accounts";
import AccountList from "../components/AccountList";
import AddFloatingButton from "../components/AddFloatingButton";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  root: {
    marginTop: 60
  },
  headerTitle: {}
});

class AddAccountContainer extends React.Component {
  onSubmit = account => {
    this.props.startAddAccount(account);
    this.props.history.push("/accounts");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <h2>Accounts</h2>
        </div>

        <Grid container spacing={8} justify="center">
          <Grid item md={4} xs={12} sm={12}>
            <AccountForm onSubmit={this.onSubmit} />
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <AccountList />
          </Grid>
        </Grid>
        <AddFloatingButton />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddAccount: account => dispatch(startAddAccount(account))
});

export default connect(undefined, mapDispatchToProps)(
  withStyles(styles)(AddAccountContainer)
);
