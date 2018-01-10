import React from 'react';
import {connect} from 'react-redux';
import TransactionListItem from './TransactionListItem';
import {startDeleteTransaction, startAddTransaction} from '../actions/transactions';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import {updateAccountBalance} from '../actions/accounts';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    }
});

class TransactionList extends React.Component {

    componentDidMount(){
        
    }

    onDelete = (idObject, id) => {
        console.log(id);
        this
            .props
            .transactions
            .map((transaction) => {
                if (transaction.id === id) {
                    return this
                        .props
                        .startDeleteTransaction(idObject, transaction);
                } else {
                    return null;
                }
            })
    };

    onCopy = (id) => {
        console.log(id);
        this
            .props
            .transactions
            .map((transaction) => {
                if (transaction.id === id) {
                    return this
                        .props
                        .startAddTransaction(transaction);
                } else {
                    return null;
                }
            })

    };

    render() {
        const {classes} = this.props;
        return (this.props.transactions.lenght === 0 || this.props.transactions.hasOwnProperty(0) === false
            ? (
                <p>no transaction</p>
            )
            : (
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell numeric>Amount</TableCell>
                            <TableCell >Date</TableCell>
                            <TableCell >Account</TableCell>
                            <TableCell >Category</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.transactions.map((transaction) => {
                                return <TransactionListItem
                                    key={transaction.id}
                                    onDelete={this.onDelete}
                                    onCopy={this.onCopy}
                                    {...transaction}/>
                            })
}
                    </TableBody>
                </Table>
            ))
    }
}
const mapStateToProps = (state) => {
    return {transactions: state.transactions};
};
const mapDispatchToProps = (dispatch, props) => ({
    startDeleteTransaction: (id, transaction) => dispatch(startDeleteTransaction(id)).then(() => {
        let delta = -transaction.amount
        if (transaction.type === 'Expense') {
            delta = -delta
        }
        dispatch(updateAccountBalance(transaction.account, delta))
    }),
    startAddTransaction: (transaction) => dispatch(startAddTransaction(transaction)).then(() => {
        let delta = transaction.amount
        if (transaction.type === 'Expense') {
            delta = -delta
        }
        dispatch(updateAccountBalance(transaction.account, delta))
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransactionList))