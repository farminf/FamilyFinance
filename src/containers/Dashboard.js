import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import AccountList from '../components/AccountList';
import TransactionList from '../components/TransactionList';
import CategoryList from '../components/CategoryList';
import AddFloatingButton from '../components/AddFloatingButton';

const styles = theme => ({
    floatingButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    },
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
        textAlign: 'center'
    },
    paper: {
        color: theme.palette.text.secondary,
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    rootgrid: {
        justifyContent: 'center'

    }
});

class Dashboard extends React.Component {

    handleClickFloatingButton = event => {};

    render() {
        const {classes} = this.props;
        return (
            <div>
                <h1>{Constants.DASHBOARD_PAGE_TITLE}</h1>
                <div className={classes.root}>
                    <Grid container spacing={8} className={classes.rootgrid}>

                        <Grid item md={10} xs={10} sm={11}>
                            <Paper className={classes.paper}>
                                <TransactionList/>
                            </Paper>
                        </Grid>
                        <Grid item md={5} xs={10} sm={11}>
                            <Paper className={classes.paper}>
                                <AccountList/>
                            </Paper>
                        </Grid>
                        <Grid item md={5} xs={10} sm={11}>
                            <Paper className={classes.paper}>
                                <CategoryList/>
                            </Paper>
                        </Grid>
                        {/*<Grid item md={12} xs={10} sm={11}>
                            <Paper className={classes.paper}>
                                <h3>ff</h3>
                            </Paper>
        </Grid>*/}

                    </Grid>
                    <AddFloatingButton/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
