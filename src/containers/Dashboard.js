import React from 'react';
import Grid from 'material-ui/Grid';
//import AccountList from '../components/AccountList';
import TransactionList from '../components/TransactionList';
//import CategoryList from '../components/CategoryList';
import AddFloatingButton from '../components/AddFloatingButton';
import {connect} from 'react-redux';
import {startSetTransactions} from '../actions/transactions';
import {startSetAccounts} from '../actions/accounts';
import {startSetCategories} from '../actions/categories';
//import MyLineChart from '../components/MyLineChart';
import MyAreaChart from '../components/MyAreaChart';
import MyBarChart from '../components/MyBarChart.js';
import MyPieChart from '../components/MyPieChart';

import _ from 'lodash';
import moment from 'moment';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalExpenseDay: [],
            totalIncomeDay: [],
            expensesByCategory: []
        }
    }

    updateStatisticData = () => {
        let totalExpenseDay = _.filter(this.props.transactions, {'type': 'Expense'});
        let totalIncomeDay = _.filter(this.props.transactions, {'type': 'Income'});
        let expensesByCategory = _.filter(this.props.transactions, {'type': 'Expense'});

        totalExpenseDay = _(totalExpenseDay)
            .groupBy('date')
            .map((v, k) => ({
                date: moment(Number(k)).format("DD-MM-YYYY"),
                day: moment(Number(k)).format("DD"),
                month: moment(Number(k)).format("MM"),
                year: moment(Number(k)).format("YYYY"),
                expense: _.sumBy(v, 'amount') / 100
            }))
            .value();

        totalIncomeDay = _(totalIncomeDay)
            .groupBy('date')
            .map((v, k) => ({
                date: moment(Number(k)).format("DD-MM-YYYY"),
                day: moment(Number(k)).format("DD"),
                month: moment(Number(k)).format("MM"),
                year: moment(Number(k)).format("YYYY"),
                income: _.sumBy(v, 'amount') / 100
            }))
            .value();

        expensesByCategory = _(expensesByCategory)
            .groupBy('category')
            .map((v, k) => ({
                expense: _.sumBy(v, 'amount') / 100,
                categories: k
            }))
            .value();

        this.setState({totalExpenseDay, totalIncomeDay, expensesByCategory});
    }

    componentWillReceiveProps() {
        this.updateStatisticData();
    }

    componentDidMount() {
        this
            .props
            .startSetTransactions();
        this.updateStatisticData();
    }

    handleClickFloatingButton = event => {};

    render() {
        return (
            <div>
                {/*<h2>{Constants.DASHBOARD_PAGE_TITLE}</h2>*/}
                <Grid container spacing={0}>

                    <Grid item xs={10} sm={10} md={6} lg={6}>
                        <MyBarChart
                            data={_.orderBy(_.merge(this.state.totalExpenseDay, this.state.totalIncomeDay), ['date'], ['asc'])}
                            title="Expense/Income/Time"
                            yAxis1="expense"
                            yAxis2="income"
                            xAxis="day"
                            fillColor1="#c40000"
                            fillColor2="#8884d8"/>
                    </Grid>

                    <Grid item xs={10} sm={10} md={6} lg={6}>
                        <MyPieChart
                            data={this.state.expensesByCategory}
                            title="Expenses By Categories"
                            dataKey="expense"
                            nameKey="categories"
                            fillColor="#8884d8"/>
                    </Grid>

                    <Grid item xs={10} sm={10} md={6} lg={6}>
                        <MyAreaChart
                            data={this.state.totalExpenseDay}
                            title="Expense / Time"
                            yAxis="expense"
                            xAxis="date"
                            lineColor="#c40000"
                            fillColor="#c40000"/>
                    </Grid>
                    <Grid item xs={10} sm={10} md={6} lg={6}>
                        <MyAreaChart
                            data={this.state.totalIncomeDay}
                            title="Income / Time"
                            dataKey="expense"
                            yAxis="income"
                            xAxis="date"
                            lineColor="#8884d8"
                            fillColor="#8884d8"/>
                    </Grid>

                    <Grid item xs={10} sm={10} md={12} lg={12}>
                        <TransactionList rowsPerPage={5}/>
                    </Grid>

                    {/*<Grid item xs={10} sm={10} md={6} lg={6}>
                        <AccountList/>
                    </Grid>

                    <Grid item xs={10} sm={10} md={6} lg={6}>
                        <CategoryList/>
        </Grid>*/}

                </Grid>
                <AddFloatingButton/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {transactions: state.transactions};
};

const mapDispatchToProps = (dispatch) => ({
    startSetTransactions: () => dispatch(startSetTransactions()),
    startSetAccounts: () => dispatch(startSetAccounts()),
    startSetCategories: () => dispatch(startSetCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
