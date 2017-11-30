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

const Dashboard = (props) => {
    const { classes } = props;
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
};

export default withStyles (styles)(Dashboard);