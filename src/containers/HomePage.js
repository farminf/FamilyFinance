import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

const HomePage = (props) => {
    const { classes } = props;
    return (
        <div>
            <h1>Home</h1>
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button raised  className={classes.button}>
                        Login
                </Button>
            </Link>
        </div>
    );
};

export default withStyles (styles)(HomePage);