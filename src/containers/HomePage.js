import React from 'react';
// import {Link} from 'react-router-dom';
import Constants from '../utils/constants'
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import {connect} from 'react-redux';
import {startLoginGoogle, startSignUp, startLoginWithEmail} from '../actions/auth';
import SignUp from '../components/SignUp';
import Login from '../components/Login';



// const mapStateToProps = (state) => {     return {isLogoutButton:
// state.header.isLogoutButton} } const mapDispatchToProps = dispatch => {
// return {         onShowHeader: isLogoutButton => {
// dispatch(showLogoutButton({isLogoutButton: isLogoutButton}));         }     }
// }

const HomePage = (props) => {

    return (
        <div>
            {/*<h1>Home</h1>*/}
            <a href="https://github.com/farminf/FamilyFinance"><img
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    border: 0
                }}
                src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
                alt="Fork me on GitHub"
                data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"/></a>
            <Grid container spacing={0} justify="center">
                <Grid item xs={12} sm={12} md={12}>
                    <Typography type="display2" component="h3">
                        {Constants.TEXT_LOGIN_CARD_HEADER}
                    </Typography>

                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={4}>
                    <Login
                        onLoginEmail={props.startLoginWithEmail}
                        onLoginGoogle={props.startLoginGoogle}/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={4}>
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

export default connect(undefined, mapDispatchToProps)(HomePage);

/*
<Grid item xs={12} sm={10} md={4} lg={4}>
                    <LoginGoogle onLoginGoogle={props.startLoginGoogle}/>
                </Grid> */