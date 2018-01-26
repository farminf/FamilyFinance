import React from 'react';
import {withStyles} from 'material-ui/styles';
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
    }
});

class EditAccountContainer extends React.Component {

    onSubmit = (account) => {
        this
            .props
            .startEditAccount(this.props.account.name, account);
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
                    <Grid container spacing={8} justify="center" >
                        <Grid item md={5} xs={12} sm={10}>
                                <AccountForm onSubmit={this.onSubmit} account={this.props.account}/>
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
        .find((account) => account.name === props.match.params.name)
});

const mapDispatchToProps = (dispatch) => ({
    startEditAccount: (name ,account) => dispatch(startEditAccount(name ,account))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditAccountContainer));
