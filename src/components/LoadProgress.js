import React from 'react';
import {withStyles} from 'material-ui/styles';

import {CircularProgress} from 'material-ui/Progress';

const styles = theme => ({
    progress: {
        margin: `0 ${theme.spacing.unit * 2}px`
        
    },
    divclass:{
        textAlign:'center',
    }
});

const LoadProgress = (props) => {
    const {classes} = props;
    return (
        <div className={classes.divclass}>
            <CircularProgress className={classes.progress} size={100}/>
        </div>
    );
}

export default withStyles(styles)(LoadProgress);