import React from 'react';
import Grid from 'material-ui/Grid';
import AccountList from '../components/AccountList';
import TransactionList from '../components/TransactionList';
import CategoryList from '../components/CategoryList';
import AddFloatingButton from '../components/AddFloatingButton';
import {connect} from 'react-redux';
import {startSetTransactions} from '../actions/transactions';
import {startSetAccounts} from '../actions/accounts';
import {startSetCategories} from '../actions/categories';
import LineChartMonth from '../components/LineChartMonth';


class Dashboard extends React.Component {

    handleClickFloatingButton = event => {};

    componentWillMount() {
        // this.props.startSetTransactions(); this.props.startSetAccounts();
        // this.props.startSetCategories();
    }

    render() {
        return (
            <div>
                {/*<h2>{Constants.DASHBOARD_PAGE_TITLE}</h2>*/}
                <Grid container spacing={0} >

                    <Grid item xs={10} sm={10} md={12} lg={12}>
                        <LineChartMonth/>
                    </Grid>

                    <Grid item xs={10} sm={10} md={12} lg={12}>
                        <TransactionList rowsPerPage={5}/>
                    </Grid>

                    <Grid item xs={10} sm={10} md={6} lg={6}>
                        <AccountList/>
                    </Grid>

                    <Grid item xs={10} sm={10} md={6} lg={6}>
                        <CategoryList/>
                    </Grid>
                    {/*<Grid item md={12} xs={10} sm={11}>
                            <Paper className={classes.paper}>
                                <h3>ff</h3>
                            </Paper>
        </Grid>*/}

                </Grid>
                <AddFloatingButton/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startSetTransactions: () => dispatch(startSetTransactions()),
    startSetAccounts: () => dispatch(startSetAccounts()),
    startSetCategories: () => dispatch(startSetCategories())
});

export default connect(undefined, mapDispatchToProps)(Dashboard);
