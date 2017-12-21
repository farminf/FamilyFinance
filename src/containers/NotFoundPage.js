import React from 'react';
import {Link} from 'react-router-dom';
import Accessibility from 'material-ui-icons/Accessibility';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    width: 300,
    height: 300
  }
});

const NotFoundPage = (props) => {

  const {classes} = props;
  return (
    <div>
      <Accessibility className={classes.icon}/>
      <h1>Oooops</h1>
      <h1>404 -
        <Link to="/">Go home</Link>
      </h1>
    </div>
  );
}

export default(withStyles(styles)(NotFoundPage));