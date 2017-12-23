import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import AccountForm from '../components/AccountForm';
import {connect} from 'react-redux';
import {startAddAccount} from '../actions/accounts';

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
        padding: 60,
        textAlign: 'center',
        color: theme.palette.text.secondary
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
            .push('/');
    };

    render() {
        const {classes} = this.props;
        return (
            <div>

                <div className={classes.root}>
                    <h1>{Constants.ADD_ACCOUNT_PAGE_TITLE}</h1>
                    <Grid container spacing={8}>

                        <Grid item md={4} xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <AccountForm onSubmit={this.onSubmit}/>
                            </Paper>
                        </Grid>

                    </Grid>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddAccount: (account) => dispatch(startAddAccount(account))
});

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(AddAccountContainer));
