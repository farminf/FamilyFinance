import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TransactionFrom from "./TransactionForm";
import { connect } from "react-redux";
import { startAddTransaction } from "../actions/transactions";
import { updateAccountBalance } from "../actions/accounts";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export const styles = theme => ({
  floatingButton: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed"
  },
  dialogContent: {
    textAlign: "center",
    maxWidth: 400
  },
  dialogTitle: {
    textAlign: "center"
  }
});

export class AddFloatingButton extends React.Component {
  state = {
    open: false
  };

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
      return this.handleClose();
    }
    this.props.startAddTransaction(transaction);

    return this.handleClose();
  };

  handleClickFloatingButton = event => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes, fullScreen } = this.props;

    return (
      <div>
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          className={classes.floatingButton}
          onClick={this.handleClickFloatingButton}
        >
          <AddIcon />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
            Add Transaction
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <TransactionFrom
              onSubmit={this.onSubmit}
              onClose={this.handleClose}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
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
      })
});

export default connect(undefined, mapDispatchToProps)(
  withStyles(styles)(withMobileDialog()(AddFloatingButton))
);
