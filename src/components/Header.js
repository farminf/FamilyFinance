import React from 'react';
import AppBar from 'material-ui/AppBar';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';

const styles = theme => ({
    root: {
        marginTop: 0,
        width: '100%'
    },
    flex: {
        flex: 0,
    }
});

const Header = (props) => {
    const { classes } = props;

    return(
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography type="title" color="inherit" className={classes.flex} >
                        TagMeCloud
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>

    );
};

export default withStyles (styles) (Header);