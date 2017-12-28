import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import AccountList from '../components/AccountList';
import TransactionList from '../components/TransactionList';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    root: {
        flexGrow: 1,
        marginTop: 30,
        marginLeft: 10,
        marginRight: 5
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    }
});

class Dashboard extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <h1>{Constants.DASHBOARD_PAGE_TITLE}</h1>
                <div className={classes.root}>
                    <Grid container spacing={8}>

                        <Grid item md={6} xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <AccountList/>
                            </Paper>
                        </Grid>
                        <Grid item md={6} xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <TransactionList/>
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}></Paper>
                        </Grid>

                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
