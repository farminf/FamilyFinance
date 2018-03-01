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
import {setTypeFilter, setDescriptionFilter ,setAccountFilter , setCategoryFilter} from '../actions/filters';
import _ from 'lodash';
import {CSVLink} from 'react-csv';
import moment from 'moment';
import Button from 'material-ui/Button';

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

            overflowX: 'auto'
        })
});

class TransactionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: this.props.rowsPerPage,
            typeFilter: '',
            descriptionFilter: '',
            accountFilter: '',
            categoryFilter: '',
            downloadCSV: false
        }
    }

    onDelete = (idObject, id) => {
        //console.log(id);
        this
            .props
            .transactions
            .map((transaction) => {
                if (transaction.id === id) {
                    if (transaction.type === 'Transfer') {
                        return this
                            .props
                            .startDeleteTransfer(idObject, transaction);
                    } else {
                        return this
                            .props
                            .startDeleteTransaction(idObject, transaction);
                    }
                } else {
                    return null;
                }
            })
    };

    onCopy = (id) => {
        //console.log(id);
        this
            .props
            .transactions
            .map((transaction) => {
                if (transaction.id === id) {

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
                        return this
                            .props
                            .startAddTransfer(transaction, firstTransaction, SecondTransaction);
                    } else {
                        return this
                            .props
                            .startAddTransaction(transaction);
                    }

                } else {
                    return null;
                }
            })
        // this     .props     .history     .push('/transactions');

    };

    onFilter = ({typeFilter, descriptionFilter , accountFilter , categoryFilter}) => {
        // const transactionsFilter = transactionSelector(this.props.transactions,
        // {typeFilter, descriptionFilter}) this.setState(() => ({transactions:
        // transactionsFilter}));
        this.setState(() => ({typeFilter, descriptionFilter ,accountFilter}));
        this
            .props
            .setDescriptionFilter(descriptionFilter);
        this
            .props
            .setTypeFilter(typeFilter);

        this
            .props
            .setAccountFilter(accountFilter);
        this
            .props
            .setCategoryFilter(categoryFilter)

    }

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    render() {
        const {classes} = this.props;
        return (

            <Paper className={classes.paper} elevation={4}>

                <FilterListBar 
                    onFilter={this.onFilter} 
                    filters={this.props.filters} 
                    exportComponent={<CSVLink
                        style={{
                            textDecoration: 'none'
                        }}
                        data={this.props.transactions.lenght === 0 || this
                            .props
                            .transactions
                            .hasOwnProperty(0) === false
                            ? []
                            : _.cloneDeep(this.props.transactions).map((object)=>{
                                delete object.id;
                                object.dateFormatted = moment(object.date).format("DD/MM/YYYY");
                                return object
                            })
                        }
                        filename={"familyfinance" + moment().unix() + ".csv"}>
                        <Button
                            className={classes.button}
                            raised
                            color="primary">
                            Download CSV
                        </Button>
                    </CSVLink>}
                />

                

            

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
                        {this.props.transactions.lenght === 0 || this
                            .props
                            .transactions
                            .hasOwnProperty(0) === false
                            ? (<TableRow key='empty'/>)
                            : (_.orderBy(this.props.transactions, ['date'], ['desc']).slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((transaction) => {
                                return <TransactionListItem
                                    key={transaction.id}
                                    onDelete={this.onDelete}
                                    onCopy={this.onCopy}
                                    {...transaction}/>
                            }))
}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={this.props.transactions.length !== undefined
                                ? this.props.transactions.length
                                : 0}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                rowsPerPageOptions={[5, 10, 20]}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}/>
                        </TableRow>
                    </TableFooter>
                </Table>

            </Paper>
        )
    }
}
const mapStateToProps = (state, props) => {
    return {
        transactions: transactionSelector(state.transactions, state.filters),
        filters: state.filters
    };

};

const mapDispatchToProps = (dispatch, props) => ({
    startDeleteTransfer: (id, transaction) => dispatch(startDeleteTransaction(id)).then(() => {

        dispatch(updateAccountBalance(transaction.transferFrom, transaction.amount))
    }).then(() => {
        dispatch(updateAccountBalance(transaction.transferTo, -transaction.amount))
    }),
    startAddTransfer: (transaction, firstTransaction, secondTransaction) => dispatch(startAddTransaction(transaction)).then(() => {
        dispatch(updateAccountBalance(firstTransaction.account, -transaction.amount))
    }).then(() => {
        dispatch(updateAccountBalance(secondTransaction.account, transaction.amount))
    }),
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
    }),
    setDescriptionFilter: (descriptionFilter) => dispatch(setDescriptionFilter(descriptionFilter)),
    setTypeFilter: (typeFilter) => dispatch(setTypeFilter(typeFilter)),
    setAccountFilter: (accountFilter) => dispatch(setAccountFilter(accountFilter)),
    setCategoryFilter: (categoryFilter) => dispatch(setCategoryFilter(categoryFilter))

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TransactionList))