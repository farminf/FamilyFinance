import React from "react";
import Grid from "material-ui/Grid";
//import AccountList from '../components/AccountList';
import TransactionList from "../components/TransactionList";
//import CategoryList from '../components/CategoryList';
import AddFloatingButton from "../components/AddFloatingButton";
import { connect } from "react-redux";
import { startSetTransactions } from "../actions/transactions";
import { startSetAccounts } from "../actions/accounts";
import { startSetCategories } from "../actions/categories";
import {
  setDashboardMonthFilter,
  setDashboardYearFilter
} from "../actions/filters";
//import MyLineChart from '../components/MyLineChart';
import MyAreaChart from "../components/MyAreaChart";
import MyBarChart from "../components/MyBarChart.js";
import MyPieChart from "../components/MyPieChart";
import FilterDashboard from "../components/FilterDashboard";
import _ from "lodash";
import moment from "moment";
import Statistic from "../components/Statistic";
import CategoryStatisticTable from "../components/CategoryStatisticTable";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpenseDay: [],
      totalIncomeDay: [],
      expensesByCategory: [],
      totalExpenseMonth: "",
      totalIncomeMonth: ""
    };
  }

  updateStatisticData = (nextProps = this.props) => {
    let totalExpenseDay = _.filter(nextProps.transactions, { type: "Expense" });
    let totalIncomeDay = _.filter(nextProps.transactions, { type: "Income" });
    let expensesByCategory = _.filter(nextProps.transactions, {
      type: "Expense"
    });
    let totalIncomeMonth = _.filter(nextProps.transactions, { type: "Income" });
    let totalExpenseMonth = _.filter(nextProps.transactions, {
      type: "Expense"
    });

    totalIncomeMonth = _.sumBy(totalIncomeMonth, "amount") / 100;
    totalExpenseMonth = _.sumBy(totalExpenseMonth, "amount") / 100;

    totalExpenseDay = _(totalExpenseDay)
      .groupBy("date")
      .map((v, k) => ({
        date: moment(Number(k)).format("DD-MM-YYYY"),
        day: moment(Number(k)).format("DD"),
        month: moment(Number(k)).format("MM"),
        year: moment(Number(k)).format("YYYY"),
        expense: _.sumBy(v, "amount") / 100
      }))
      .value();

    totalIncomeDay = _(totalIncomeDay)
      .groupBy("date")
      .map((v, k) => ({
        date: moment(Number(k)).format("DD-MM-YYYY"),
        day: moment(Number(k)).format("DD"),
        month: moment(Number(k)).format("MM"),
        year: moment(Number(k)).format("YYYY"),
        income: _.sumBy(v, "amount") / 100
      }))
      .value();

    expensesByCategory = _(expensesByCategory)
      .groupBy("category")
      .map((v, k) => ({
        expense: _.sumBy(v, "amount") / 100,
        categories: k
      }))
      .value();

    this.setState({
      totalExpenseDay,
      totalIncomeDay,
      expensesByCategory,
      totalIncomeMonth,
      totalExpenseMonth
    });
  };

  componentWillReceiveProps(nextProps) {
    this.updateStatisticData(nextProps);
  }

  componentDidMount() {
    // this     .props     .startSetTransactions();
    this.updateStatisticData();
  }

  // handleClickFloatingButton = event => {};

  onFilterDashboard = ({ dashboardYearFilter, dashboardMonthFilter }) => {
    this.props.setDashboardMonthFilter(dashboardMonthFilter);
    this.props.setDashboardYearFilter(dashboardYearFilter);

    var startDate = moment([dashboardYearFilter, dashboardMonthFilter - 1]);
    var endDate = moment(startDate).endOf("month");

    this.props.startSetTransactions(startDate.valueOf(), endDate.valueOf());
  };

  onSubmit = transaction => {
    this.props.startAddTransaction(transaction);
  };

  render() {
    return (
      <div>
        {/*<h2>{Constants.DASHBOARD_PAGE_TITLE}</h2>*/}
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <FilterDashboard
              onFilterDashboard={this.onFilterDashboard}
              filters={this.props.filters}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <MyPieChart
              data={this.state.expensesByCategory}
              title="Expenses By Categories"
              dataKey="expense"
              nameKey="categories"
              fillColor="#8884d8"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <MyBarChart
              data={_.orderBy(
                [
                  ...this.state.totalExpenseDay
                    .concat(this.state.totalIncomeDay)
                    .reduce(
                      (m, o) =>
                        m.set(o.date, Object.assign(m.get(o.date) || {}, o)),
                      new Map()
                    )
                    .values()
                ],
                ["date"],
                ["asc"]
              )}
              title="Expense/Income/Time"
              yAxis1="expense"
              yAxis2="income"
              xAxis="day"
              fillColor1="#c40000"
              fillColor2="#8884d8"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Statistic
              variableName="Expense"
              variableValue={this.state.totalExpenseMonth}
              variableName2="Income"
              variableValue2={this.state.totalIncomeMonth}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={8} lg={8}>
            <MyAreaChart
              data={_.orderBy(this.state.totalExpenseDay, ["date"], ["asc"])}
              title="Expense / Time"
              yAxis="expense"
              xAxis="date"
              lineColor="#c40000"
              fillColor="#c40000"
            />
          </Grid>
          {/*<Grid item xs={10} sm={10} md={6} lg={6}>
                        <MyAreaChart
                            data={this.state.totalIncomeDay}
                            title="Income / Time"
                            dataKey="expense"
                            yAxis="income"
                            xAxis="date"
                            lineColor="#8884d8"
                            fillColor="#8884d8"/>
        </Grid>*/}

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TransactionList rowsPerPage={5} />
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <CategoryStatisticTable data={this.state.expensesByCategory} />
          </Grid>

          {/*<Grid item xs={10} sm={10} md={6} lg={6}>
                        <AccountList/>
                    </Grid>

                    <Grid item xs={10} sm={10} md={6} lg={6}>
                        <CategoryList/>
        </Grid>*/}
        </Grid>
        <AddFloatingButton />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { transactions: state.transactions, filters: state.filters };
};

const mapDispatchToProps = dispatch => ({
  startSetTransactions: (startDate, endDate) =>
    dispatch(startSetTransactions(startDate, endDate)),
  startSetAccounts: () => dispatch(startSetAccounts()),
  startSetCategories: () => dispatch(startSetCategories()),
  setDashboardMonthFilter: dashboardMonthFilter =>
    dispatch(setDashboardMonthFilter(dashboardMonthFilter)),
  setDashboardYearFilter: dashboardYearFilter =>
    dispatch(setDashboardYearFilter(dashboardYearFilter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
