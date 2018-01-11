import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import AccountForm from '../components/AccountForm';
import {connect} from 'react-redux';
import {startAddAccount} from '../actions/accounts';
import AccountList from '../components/AccountList';
import AddFloatingButton from '../components/AddFloatingButton';


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
        textAlign: 'center'
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'

    }
});

class AddAccountContainer extends React.Component {

    onSubmit = (account) => {

        this
            .props
            .startAddAccount(account);
        this
            .props
            .history
            .push('/accounts');

    };

    render() {
        const {classes} = this.props;
        return (
            <div>

                <div className={classes.root}>
                    <h1>{Constants.ADD_ACCOUNT_PAGE_TITLE}</h1>
                    <Grid container spacing={8}>

                        <Grid item md={4} xs={10} sm={5}>
                            <Paper className={classes.paper}>
                                <AccountForm onSubmit={this.onSubmit}/>
                            </Paper>
                        </Grid>
                        <Grid item md={8} xs={10} sm={5}>
                            <Paper className={classes.paper}>
                                <AccountList/>
                            </Paper>
                        </Grid>

                    </Grid>
                    <AddFloatingButton/>
                </div>
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch) => ({
    startAddAccount: (account) => dispatch(startAddAccount(account))
});

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(AddAccountContainer));
