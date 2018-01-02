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
        marginRight: 30,
        marginLeft: 30,
        textAlign: 'center',
        
    },
    paper: {
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
                    <Grid container spacing={8} justify-content='center'>

                        <Grid item md={5} xs={10} sm={11}>
                            <Paper className={classes.paper}>
                                <AccountList/>
                            </Paper>
                        </Grid>
                        <Grid item md={7} xs={10} sm={11}>
                            <Paper className={classes.paper}>
                                <TransactionList/>
                            </Paper>
                        </Grid>
                        {/*<Grid item md={12} xs={10} sm={11}>
                            <Paper className={classes.paper}>
                                <h3>ff</h3>
                            </Paper>
        </Grid>*/}

                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
