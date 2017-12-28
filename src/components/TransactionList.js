import React from 'react';
import {connect} from 'react-redux';
import TransactionListItem from './TransactionListItem';
import {startDeleteTransaction, startEditTransaction} from '../actions/transactions';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';


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

    onEdit = (id, update) => {
        this
            .props
            .startEditTransaction(id, update);
    };

    render() {
        const {classes} = this.props;
        return (
                this.props.transactions.lenght === 0
                    ? (
                        <p>no transaction</p>
                    )
                    : (
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell numeric>Amount</TableCell>
                                    <TableCell >Date</TableCell>
                                    <TableCell >Account</TableCell>
                                    <TableCell >Options</TableCell>
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
                                            onEdit={this.onEdit}
                                            {...transaction}/>
                                    })
}
                            </TableBody>
                        </Table>
                    )
        )
    }
}
const mapStateToProps = (state) => {
    return {transactions: state.transactions};
};
const mapDispatchToProps = (dispatch, props) => ({
    startDeleteTransaction: (data) => dispatch(startDeleteTransaction(data)),
    startEditTransaction: (id, update) => dispatch(startEditTransaction(id, update))
});

export default connect (mapStateToProps,mapDispatchToProps)(withStyles(styles)(TransactionList))