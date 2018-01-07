import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import TransactionForm from '../components/TransactionForm';
import {connect} from 'react-redux';
import {startEditTransaction} from '../actions/transactions';
import {updateAccountBalance} from '../actions/accounts';

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
        marginLeft: 10,
        marginRight: 5,
        height: 'auto'
    },
    paper: {
        padding: 60,
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
});

class EditTransactionContainer extends React.Component {

    onSubmit = (transaction) => {
        // console.log(this.props.transaction)
        

        this
            .props
            .startEditTransaction(this.props.transaction, transaction);
        this
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
                    <Grid container spacing={8} justify="center">

                        <Grid item md={4} xs={12} sm={6}>
                            <Paper className={classes.paper}>
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
    startEditTransaction: (oldTransaction, transaction) => dispatch(startEditTransaction(oldTransaction.id, transaction))
    .then(() => {
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
