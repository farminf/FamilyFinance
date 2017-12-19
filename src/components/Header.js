import React from 'react';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';
import Constants from '../utils/constants'



const styles = theme => ({
    root: {
        marginTop: 0,
        width: '100%'
    },
    flex: {
        flex: 0
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: 'none'
    },
    button: {
        margin: theme.spacing.unit
    }
});


const Header = (props) => {
    const {classes} = props;
    const open = false;
    //console.log(props)
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        color="contrast"
                        aria-label="open drawer"
                        
                        className={classNames(classes.menuButton, open && classes.hide)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        {props.title}
                    </Typography>
                    <Button onClick={props.startLogout} raised className={classes.button}>
                    {Constants.ASSIGNS_LOGOUT}
                </Button>
                </Toolbar>
            </AppBar>
        </div>

    );
};

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});


export default connect(undefined , mapDispatchToProps)(withStyles(styles)(Header));