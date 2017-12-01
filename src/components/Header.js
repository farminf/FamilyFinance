import React from 'react';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';

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
    }
});

const Header = (props) => {
    const {classes} = props;
    const open  = false;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton
                        color="contrast"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

    );
};

export default withStyles(styles)(Header);