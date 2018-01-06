import React from 'react';
import {connect} from 'react-redux';
import TransactionListItem from './TransactionListItem';
import {startDeleteTransaction, startAddTransaction} from '../actions/transactions';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

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

    onDelete = (id) => {
        this
            .props
            .startDeleteTransaction(id);
    };

    onCopy = (id) => {
        console.log(id)
        this
            .props
            .transactions
            .map((transaction) => {
                if (transaction.id === id) {
                    return this
                        .props
                        .startAddTransaction(transaction);
                } else {
                    return console.log('no transaction with this ID found')
                }
            })

    };

    render() {
        const {classes} = this.props;
        return (this.props.transactions.lenght === 0
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
                        {this
                            .props
                            .transactions
                            .map((transaction) => {
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
    startDeleteTransaction: (data) => dispatch(startDeleteTransaction(data)),
    startAddTransaction: (transaction) => dispatch(startAddTransaction(transaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransactionList))