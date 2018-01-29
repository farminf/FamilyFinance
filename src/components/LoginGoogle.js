import React from 'react';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import FaGoogle from 'react-icons/lib/fa/google-plus-square';


const styles = theme => ({

    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 270,
        marginTop: 30,
        marginBottom: theme.spacing.unit
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
    ,
    googleicon:{
        marginRight : 5
    }
});

const LoginGoogle = (props) => {
    const {classes} = props;
    return (
       

 
            
            <Button onClick={props.onLoginGoogle} raised className={classes.button}>
                <FaGoogle size={30} color='red' className={classes.googleicon}/>
                Login With Google
            </Button>
            
    )
}

export default withStyles(styles)(LoginGoogle);

           /* <Paper className={classes.paper} elevation={4}><Link
                                to="/dashboard"
                                style={{
                                textDecoration: 'none'
                            }}>
                            </Link>
            <Typography type="body1" component="p">
                Login With Google
            </Typography>
            </Paper>
            */