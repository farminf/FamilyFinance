import React from 'react';
import {withStyles} from 'material-ui/styles';
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
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        textAlign: 'center',
        justifyContent: 'center'
    },
    rootGrid:{
        
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
                    <h2>{Constants.ADD_ACCOUNT_PAGE_TITLE}</h2>
                    <Grid container spacing={8} className={classes.rootGrid}>

                        <Grid item md={4} xs={10} sm={7}>
                                <AccountForm onSubmit={this.onSubmit}/>
                        </Grid>
                        <Grid item md={6} xs={10} sm={8}>
                                <AccountList/>
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
