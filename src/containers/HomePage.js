import React from "react";
// import {Link} from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import FaGithub from "react-icons/lib/fa/github";
import IconButton from "@material-ui/core/IconButton";

import { connect } from "react-redux";
import {
  startLoginGoogle,
  startSignUp,
  startLoginWithEmail,
  startLoginFacebook,
  startLoginGithub
} from "../actions/auth";
// import SignUp from "../components/SignUp";
import Login from "../components/Login";
import { startDemo } from "../actions/demo";
import bgImage from "../images/background.jpg";

const styles = theme => ({
  header: {
    backgroundColor: "#6e81ea",
    flexGrow: 1
  },

  title: {
    textAlign: "initial",
    color: "white",
    paddingTop: 10,
    flex: 1
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    color: "white"
  }
});

const HomePage = props => {
  return (
    <div>
      {/*<h1>Home</h1>*/}
      <img src={bgImage} alt="bg" className="bg" />
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12} md={12} className={props.classes.header}>
          <Toolbar>
            <Typography
              variant="display1"
              className={props.classes.title}
              gutterBottom
            >
              Family Finance
            </Typography>
            <Button
              onClick={() => props.startDemo("demo")}
              variant="outlined"
              className={props.classes.button}
            >
              Try Demo
            </Button>
            <IconButton
              onClick={() =>
                window.open(
                  "https://github.com/farminf/FamilyFinance",
                  "_blank"
                )
              }
              aria-haspopup="true"
              color="inherit"
            >
              <FaGithub size={40} color="#333" />
            </IconButton>
          </Toolbar>
        </Grid>
        {/*<Grid item xs={12} sm={8} md={5} lg={4}>
          <SignUp onSignup={props.startSignUp} />
        </Grid>*/}
        <Grid item xs={12} sm={8} md={5} lg={4}>
          <Login
            onLoginEmail={props.startLoginWithEmail}
            onLoginGoogle={props.startLoginGoogle}
            onLoginFacebook={props.startLoginFacebook}
            onLoginGithub={props.startLoginGithub}
          />
        </Grid>
        {/*<Grid item xs={12} sm={8} md={5} lg={4}>
          <DemoStarter onDemo={() => props.startDemo("demo")} />
      </Grid>*/}
      </Grid>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startSignUp: (email, password) => dispatch(startSignUp(email, password)),
  startLoginWithEmail: (email, password) =>
    dispatch(startLoginWithEmail(email, password)),
  startDemo: type => dispatch(startDemo(type)),
  startLoginFacebook: () => dispatch(startLoginFacebook()),
  startLoginGithub: () => dispatch(startLoginGithub())
});

export default withStyles(styles)(
  connect(undefined, mapDispatchToProps)(HomePage)
);
