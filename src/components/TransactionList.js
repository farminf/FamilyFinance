import React from 'react';
import {connect} from 'react-redux';
import TransactionListItem from './TransactionListItem';
import {startDeleteTransaction, startAddTransaction} from '../actions/transactions';
import {withStyles} from 'material-ui/styles';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination
} from 'material-ui/Table';
import {updateAccountBalance} from '../actions/accounts';
import FilterListBar from '../components/FilterListBar';
import transactionSelector from '../selectors/TransactionSelector';
import Paper from 'material-ui/Paper';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    },
    paper: theme
        .mixins
        .gutters({


            paddingLeft: 0,
            paddingRight: 0,
            marginTop: theme.spacing.unit * 3,
            marginLeft: 10,
            marginRight: 10,
            overflowX: 'auto'
        })
});

class TransactionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: this.props.rowsPerPage,
            transactions: this.props.transactions
        }
    }

    componentDidMount() {}

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

    onFilter = ({typeFilter, descriptionFilter}) => {
        const transactionsFilter = transactionSelector(this.props.transactions, {typeFilter, descriptionFilter})

        this.setState(() => ({transactions: transactionsFilter}));

    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    render() {
        const {classes} = this.props;
        return (this.state.transactions.lenght === 0 || this.state.transactions.hasOwnProperty(0) === false
            ? (
                <div>
                    <FilterListBar onFilter={this.onFilter}/>
                    <p>no transaction</p>
                </div>
            )
            : (
                <Paper className={classes.paper} elevation={4}>


                    <FilterListBar onFilter={this.onFilter}/>

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
                                .state
                                .transactions
                                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                .map((transaction) => {
                                    return <TransactionListItem
                                        key={transaction.id}
                                        onDelete={this.onDelete}
                                        onCopy={this.onCopy}
                                        {...transaction}/>
                                })
}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={this.state.transactions.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    rowsPerPageOptions={[5, 10]}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                            </TableRow>
                        </TableFooter>
                    </Table>

                </Paper>
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