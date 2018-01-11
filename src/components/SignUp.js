import React from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Recaptcha from 'react-recaptcha';

const styles = theme => ({

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
        }),
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: 250,
        padding: 10
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    }
});

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmpassword: '',
            error: ''
        };
    };

    onSignup = (e) => {
        e.preventDefault();
        if (!this.state.email || !this.state.password || !this.state.confirmpassword || !this.state.email.match(/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            this.setState(() => ({error: 'All field should be filled in the correct way'}));
        } else {
            this.setState(() => ({error: ''}));
            this
                .props
                .onSignup(this.state.email, this.state.password);
        }
    };

    onEmailChange = (e) => {
        const email = e.target.value;
        // if (!email ||
        // email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\
        // 
        //
        //
        // [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-
        // Z ]{2,}))$/)) {
        this.setState(() => ({email}));
        //}

    };

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}));
    };

    onConfirmPasswordChange = (e) => {
        const confirmpassword = e.target.value;
        this.setState(() => ({confirmpassword}));
    };

    render() {
        const {classes} = this.props;
        return (

            <Paper className={classes.paper} elevation={4}>

                <Typography type="body1" component="p">
                    Create New Account
                </Typography>

                <form>
                    <TextField
                        required
                        className={classes.textField}
                        type="text"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.onEmailChange}/>
                    <TextField
                        required
                        className={classes.textField}
                        type="password"
                        placeholder="Password"
                        alue={this.state.password}
                        onChange={this.onPasswordChange}/>
                    <TextField
                        required
                        className={classes.textField}
                        type="password"
                        placeholder="Confirm Password"
                        alue={this.state.confirmpassword}
                        onChange={this.onConfirmPasswordChange}/>

                    <Recaptcha
                        className={classes.textField}
                        sitekey="6Lc1_j8UAAAAAH5zKYdv055fpSrIDghc3J6xZF02"
                       />
                    <Button onClick={this.onSignup} raised className={classes.button}>
                        Register
                    </Button>
                    {this.state.error && <p>{this.state.error}</p>}
                </form>
            </Paper>
        )
    }
}

export default withStyles(styles)(SignUp);