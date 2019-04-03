import React, { Fragment, useState } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 250,
    padding: 10
  }
});

export const LoginPasswordLess = props => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  return (
    <Fragment>
      <Input
        required
        placeholder="Email"
        id="email"
        className={classes.textField}
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button
        onClick={() => props.onLoginEmailPasswordless(email)}
        variant="contained"
        className={classes.button}
      >
        Login
      </Button>
    </Fragment>
  );
};

export default withStyles(styles)(LoginPasswordLess);
