import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Constants from "../utils/constants";
//import TransactionForm from '../components/TransactionForm';
import { connect } from "react-redux";
import {
  startSetTransactions,
  startAddTransaction
} from "../actions/transactions";
import {
  setDashboardMonthFilter,
  setDashboardYearFilter
} from "../actions/filters";
import TransactionList from "../components/TransactionList";
import { updateAccountBalance } from "../actions/accounts";
import AddFloatingButton from "../components/AddFloatingButton";
import FilterDashboard from "../components/FilterDashboard";
import moment from "moment";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  root: {
    marginTop: 60
  }
});

class AddTransactionContainer extends React.Component {
  onSubmit = transaction => {
    if (transaction.type === "Transfer") {
      let firstTransaction = {
        type: transaction.type,
        description: transaction.description,
        amount: transaction.amount,
        category: transaction.category,
        date: transaction.date,
        account: transaction.transferFrom
      };
      let SecondTransaction = {
        type: transaction.type,
        description: transaction.description,
        amount: transaction.amount,
        category: transaction.category,
        date: transaction.date,
        account: transaction.transferTo
      };
      this.props.startAddTransfer(
        transaction,
        firstTransaction,
        SecondTransaction
      );
      return this.props.history.push("/transactions");
    }
    this.props.startAddTransaction(transaction);
    return this.props.history.push("/transactions");
  };

  onFilterDashboard = ({ dashboardYearFilter, dashboardMonthFilter }) => {
    this.props.setDashboardMonthFilter(dashboardMonthFilter);
    this.props.setDashboardYearFilter(dashboardYearFilter);

    var startDate = moment([dashboardYearFilter, dashboardMonthFilter - 1]);
    var endDate = moment(startDate).endOf("month");

    this.props.startSetTransactions(startDate.valueOf(), endDate.valueOf());
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h2>{Constants.ADD_TRANSACTION_PAGE_TITLE}</h2>
        <Grid container spacing={8} justify="center">
          {/*<Grid item xs={12} sm={12} md={12} lg={12}>
                            <FilterDashboard
                                onFilterDashboard={this.onFilterDashboard}
                                filters={this.props.filters}/>
                        </Grid>

                        <Grid item xs={12} md={4}  sm={12}>
                            <TransactionForm onSubmit={this.onSubmit}/>
                        </Grid>*/}
          <Grid item xs={12} sm={12} md={10}>
            <FilterDashboard
              onFilterDashboard={this.onFilterDashboard}
              filters={this.props.filters}
            />
            <TransactionList rowsPerPage={10} />
          </Grid>
        </Grid>
        <AddFloatingButton />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { filters: state.filters };
};

const mapDispatchToProps = dispatch => ({
  startAddTransaction: transaction =>
    dispatch(startAddTransaction(transaction)).then(() => {
      let delta = transaction.amount;
      if (transaction.type === "Expense") {
        delta = -delta;
      }
      dispatch(updateAccountBalance(transaction.account, delta));
    }),
  startAddTransfer: (transaction, firstTransaction, secondTransaction) =>
    dispatch(startAddTransaction(transaction))
      .then(() => {
        dispatch(
          updateAccountBalance(firstTransaction.account, -transaction.amount)
        );
      })
      .then(() => {
        dispatch(
          updateAccountBalance(secondTransaction.account, transaction.amount)
        );
      }),
  startSetTransactions: (startDate, endDate) =>
    dispatch(startSetTransactions(startDate, endDate)),
  setDashboardMonthFilter: dashboardMonthFilter =>
    dispatch(setDashboardMonthFilter(dashboardMonthFilter)),
  setDashboardYearFilter: dashboardYearFilter =>
    dispatch(setDashboardYearFilter(dashboardYearFilter))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AddTransactionContainer)
);
