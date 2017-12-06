import React from 'react';
import {Link} from 'react-router-dom';
import Accessibility from 'material-ui-icons/Accessibility';
import {withStyles} from 'material-ui/styles';
import {showLogoutButton} from '../actions/header';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {isLogoutButton: state.header.isLogoutButton}
}

const mapDispatchToProps = dispatch => {
  return {
    onShowHeader: isLogoutButton => {
      dispatch(showLogoutButton({isLogoutButton: isLogoutButton}));
    }
  }
}

const styles = theme => ({
  icon: {
    margin: theme.spacing.unit,
    width: 300,
    height: 300
  }
});

class NotFoundPage extends React.Component {

  componentWillMount() {
    this.props.onShowHeader(false);
  }

  render() {
    const {classes} = this.props;
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
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NotFoundPage));