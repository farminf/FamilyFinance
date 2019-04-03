import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Lock from "react-icons/lib/fa/lock";

export const styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 270,
    marginTop: 30,
    marginBottom: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  paper: theme.mixins.gutters({
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: theme.spacing.unit * 3,
    marginLeft: 20,
    marginRight: 20
  }),
  googleicon: {
    marginRight: 5
  }
});

export const LoginPasswordLess = props => {
  const { classes } = props;
  return (
    <Button
      onClick={props.onLoginEmailPasswordless}
      variant="contained"
      className={classes.button}
    >
      <Lock size={30} color="black" className={classes.googleicon} />
      Login With Email
    </Button>
  );
};

export default withStyles(styles)(LoginPasswordLess);
