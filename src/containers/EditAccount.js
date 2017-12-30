import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import AccountForm from '../components/AccountForm';
import {connect} from 'react-redux';
import {startEditAccount} from '../actions/accounts';

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

class EditAccountContainer extends React.Component {

    onSubmit = (account) => {
        this
            .props
            .startEditAccount(this.props.account.id, account);
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
                    <Grid container spacing={8} justify="center">
                        <Grid item md={4} xs={12} sm={6}>
                            <Paper className={classes.paper}>
                                <AccountForm onSubmit={this.onSubmit} account={this.props.account}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    account: state
        .accounts
        .find((account) => account.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
    startEditAccount: (id ,account) => dispatch(startEditAccount(id ,account))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditAccountContainer));
