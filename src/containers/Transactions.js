import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import TransactionForm from '../components/TransactionForm';
import {connect} from 'react-redux';
import {startAddTransaction} from '../actions/transactions';
import TransactionList from '../components/TransactionList';
import {updateAccountBalance} from '../actions/accounts';
import AddFloatingButton from '../components/AddFloatingButton';



const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        textAlign: 'center',
    }
    
});

class AddTransactionContainer extends React.Component {

    onSubmit = (transaction) => {
        this
            .props
            .startAddTransaction(transaction);
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
                    <h2>{Constants.ADD_TRANSACTION_PAGE_TITLE}</h2>
                    <Grid container spacing={8}>

                        <Grid item md={3} xs={10} sm={11}>
                                <TransactionForm onSubmit={this.onSubmit}/>
                        </Grid>
                        <Grid item md={9} xs={10} sm={11}>
                            <TransactionList rowsPerPage={10} />
                    </Grid>

                    </Grid>
                    <AddFloatingButton/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddTransaction: (transaction) => dispatch(startAddTransaction(transaction))
    .then(() => {
        let delta = transaction.amount
        if(transaction.type === 'Expense'){
           delta = -delta 
        }
        dispatch(updateAccountBalance(transaction.account, delta))
    })
});

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(AddTransactionContainer));
