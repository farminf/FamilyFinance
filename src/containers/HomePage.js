import React from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
// import {Link} from 'react-router-dom';
import Constants from '../utils/constants'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import {showLogoutButton} from '../actions/header';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

const styles = theme => ({

    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    paper: theme
        .mixins
        .gutters({
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 16,
            paddingRight: 16,
            marginTop: theme.spacing.unit * 3,
            marginLeft: 20,
            marginRight: 20
        })

});

// const mapStateToProps = (state) => {     return {isLogoutButton:
// state.header.isLogoutButton} } const mapDispatchToProps = dispatch => {
// return {         onShowHeader: isLogoutButton => {
// dispatch(showLogoutButton({isLogoutButton: isLogoutButton}));         }     }
// }

const HomePage = (props) =>{
    
    
        const {classes} = props;
        return (
            <div >
                {/*<h1>Home</h1>*/}
                <Grid container spacing={8} justify="center">
                    <Grid item xs={3} md={3}>
                        <Paper className={classes.paper} elevation={4}>
                            <Typography type="headline" component="h3">
                                {Constants.TEXT_LOGIN_CARD_HEADER}
                            </Typography>
                            <Typography type="body1" component="p">
                                {Constants.TEXT_LOGIN_CARD_BODY}
                            </Typography>
                            {/*<Link
                                to="/dashboard"
                                style={{
                                textDecoration: 'none'
                            }}>
                            </Link>*/}
                            <Button onClick={props.startLogin} raised className={classes.button}>
                                {Constants.ASSIGNS_LOGIN}
                            </Button>

                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }


const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined,mapDispatchToProps)(withStyles(styles)(HomePage));