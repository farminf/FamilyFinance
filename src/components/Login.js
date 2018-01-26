import React from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import FormControl from 'material-ui/Form/FormControl';

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

class LoginUserNamePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showPassword: false
        }
    }

    onLoginWithEmail = (e) => {
        e.preventDefault();
        if (!this.state.email || !this.state.password || !this.state.email.match(/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            this.setState(() => ({error: 'All field should be filled in the correct way'}));
        } else {
            this.setState(() => ({error: ''}));
            this
                .props
                .onLoginEmail(this.state.email, this.state.password);
        }
    };

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}));

    };

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}));
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPasssword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper} elevation={4}>
                <Typography type="body1" component="p">
                    Login With Username and Password
                </Typography>

                <form onSubmit={this.onSubmit}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            required
                            id="username"
                            className={classes.textField}
                            type="text"
                            value={this.state.email}
                            onChange={this.onEmailChange}/>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="password">Password</InputLabel>

                        <Input
                            required
                            id="password"
                            type={this.state.showPassword
                            ? 'text'
                            : 'password'}
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                            endAdornment={
                                <InputAdornment position = "end" > 
                                    <IconButton
                                        onClick={this.handleClickShowPasssword}
                                        onMouseDown={this.handleMouseDownPassword}>
                                        {this.state.showPassword
                                            ? <VisibilityOff/>
                                            : <Visibility/>}
                                    </IconButton> 
                                </InputAdornment>}/>

                        <Button onClick={this.onLoginWithEmail} raised className={classes.button}>
                            Login
                        </Button>
                        {this.state.error && <p>{this.state.error}</p>}
                    </FormControl>
                </form>
            </Paper>
        )
    }
}

export default withStyles(styles)(LoginUserNamePassword);