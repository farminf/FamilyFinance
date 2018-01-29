import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import TransactionForm from '../components/TransactionForm';
import {connect} from 'react-redux';
import {startEditTransaction, startAddTransaction, startDeleteTransaction} from '../actions/transactions';
import {updateAccountBalance} from '../actions/accounts';
import Paper from 'material-ui/Paper';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    root: {
        flexGrow: 1,
        marginTop: 30,
        height: 'auto'
    },
    paper: theme
        .mixins
        .gutters({
            paddingLeft: 0,
            paddingRight: 0,
            marginTop: theme.spacing.unit * 3,
            overflowX: 'auto'
        })
});

class EditTransactionContainer extends React.Component {

    onSubmit = (transaction) => {
        // console.log(this.props.transaction)

        if (transaction.type === 'Transfer') {
            let firstTransaction = {
                type: transaction.type,
                description: transaction.description,
                amount: transaction.amount,
                category: transaction.category,
                date: transaction.date,
                account: transaction.transferFrom
            }
            let SecondTransaction = {
                type: transaction.type,
                description: transaction.description,
                amount: transaction.amount,
                category: transaction.category,
                date: transaction.date,
                account: transaction.transferTo
            }
            this
                .props
                .startEditTransfer(transaction, this.props.transaction, firstTransaction, SecondTransaction)
            // this     .props     .startAddTransfer(transaction, firstTransaction,
            // SecondTransaction); this     .props
            // .startDeleteTransfer(this.props.transaction.id, this.props.transaction);
        } else {
            this
                .props
                .startEditTransaction(this.props.transaction, transaction);
        }

        return this
            .props
            .history
            .push('/transactions');
    };

    render() {
        const {classes} = this.props;
        return (
            <div>

                <div className={classes.root}>
                    <h1>{Constants.ADD_TRANSACTION_PAGE_TITLE}</h1>
                    <Grid container spacing={8} justify="center" >

                        <Grid item md={4} xs={12} sm={8}>
                        <Paper className={classes.paper} elevation={4}>
                            <TransactionForm transaction={this.props.transaction} onSubmit={this.onSubmit}/>
                        </Paper>
                        </Grid>

                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    transaction: state
        .transactions
        .find((transaction) => transaction.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    startEditTransfer: (transaction, oldTransaction, firstTransaction, secondTransaction) => dispatch(startAddTransaction(transaction)).then(() => {
        dispatch(updateAccountBalance(firstTransaction.account, -transaction.amount))
    }).then(() => {
        dispatch(updateAccountBalance(secondTransaction.account, transaction.amount))
    }).then(() => {
        dispatch(startDeleteTransaction({id : oldTransaction.id}))
    }).then(() => {
        dispatch(updateAccountBalance(oldTransaction.transferFrom, oldTransaction.amount))
    }).then(() => {
        dispatch(updateAccountBalance(oldTransaction.transferTo, -oldTransaction.amount))
    }),

    // startAddTransfer: (transaction, firstTransaction, secondTransaction) =>
    // dispatch(startAddTransaction(transaction)).then(() => {
    // dispatch(updateAccountBalance(firstTransaction.account, -transaction.amount))
    // }).then(() => {     dispatch(updateAccountBalance(secondTransaction.account,
    // transaction.amount)) }), startDeleteTransfer: (id, transaction) =>
    // dispatch(startDeleteTransaction(id)).then(() => {
    // dispatch(updateAccountBalance(transaction.transferFrom, transaction.amount))
    // }).then(() => {     dispatch(updateAccountBalance(transaction.transferTo,
    // -transaction.amount)) }),

    startEditTransaction: (oldTransaction, transaction) => dispatch(startEditTransaction(oldTransaction.id, transaction)).then(() => {
        let delta = -oldTransaction.amount
        if (oldTransaction.type === 'Expense') {
            delta = -delta
        }
        dispatch(updateAccountBalance(oldTransaction.account, delta))
    }).then(() => {
        let delta = transaction.amount
        if (transaction.type === 'Expense') {
            delta = -delta
        }
        dispatch(updateAccountBalance(transaction.account, delta))
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditTransactionContainer));
