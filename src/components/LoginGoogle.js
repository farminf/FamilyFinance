import React from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Constants from '../utils/constants'
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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

const LoginGoogle = (props) => {
    const {classes} = props;
    return (
        <Paper className={classes.paper} elevation={4}>

            {/*<Link
                                to="/dashboard"
                                style={{
                                textDecoration: 'none'
                            }}>
                            </Link>*/}
            <Typography type="body1" component="p">
                Login With Google
            </Typography>
            <Button onClick={props.onLoginGoogle} raised className={classes.button}>
                {Constants.ASSIGNS_LOGIN}
            </Button>

        </Paper>
    )
}

export default withStyles(styles)(LoginGoogle);