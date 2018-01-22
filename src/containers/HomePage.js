import React from 'react';
import {withStyles} from 'material-ui/styles';
// import {Link} from 'react-router-dom';
import Constants from '../utils/constants'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import {connect} from 'react-redux';
import {startLoginGoogle, startSignUp, startLoginWithEmail} from '../actions/auth';
import LoginGoogle from '../components/LoginGoogle';
import SignUp from '../components/SignUp';
import LoginUserNamePassword from '../components/Login';

const styles = theme => ({

    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    }

});

// const mapStateToProps = (state) => {     return {isLogoutButton:
// state.header.isLogoutButton} } const mapDispatchToProps = dispatch => {
// return {         onShowHeader: isLogoutButton => {
// dispatch(showLogoutButton({isLogoutButton: isLogoutButton}));         }     }
// }

const HomePage = (props) => {

    return (
        <div >
            {/*<h1>Home</h1>*/}
            <Grid container spacing={0} justify="center">
                <Grid item xs={12} sm={12} md={12}>
                    <Typography type="display2" component="h3">
                        {Constants.TEXT_LOGIN_CARD_HEADER}
                    </Typography>
                    <Typography type="headline" component="p">
                        {Constants.TEXT_LOGIN_CARD_BODY}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={10} md={4} lg={4}>
                    <LoginGoogle onLoginGoogle={props.startLoginGoogle}/>
                </Grid>
                <Grid item xs={12} sm={10} md={4} lg={4}>
                    <LoginUserNamePassword onLoginEmail={props.startLoginWithEmail}/>
                </Grid>
                <Grid item xs={12} sm={10} md={4} lg={4}>
                    <SignUp onSignup={props.startSignUp}/>
                </Grid>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    startLoginGoogle: () => dispatch(startLoginGoogle()),
    startSignUp: (email, password) => dispatch(startSignUp(email, password)),
    startLoginWithEmail: (email, password) => dispatch(startLoginWithEmail(email, password))
});

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(HomePage));