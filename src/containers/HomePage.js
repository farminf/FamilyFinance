import React from "react";
// import {Link} from 'react-router-dom';
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import { connect } from "react-redux";
import {
  startLoginGoogle,
  startSignUp,
  startLoginWithEmail
} from "../actions/auth";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import { startDemo } from "../actions/demo";
import DemoStarter from "../components/DemoStarter";
import bgImage from "../images/background.jpg";

const styles = theme => ({
  header: {
    backgroundColor: "#3f50b5",
    color: "white"
  },
  title: {
    color: "white",
    paddingTop: 10
  }
});

const HomePage = props => {
  return (
    <div>
      {/*<h1>Home</h1>*/}
      <img src={bgImage} alt="bg" class="bg" />
      <a href="https://github.com/farminf/FamilyFinance">
        <img
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            border: 0
          }}
          src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
          alt="Fork me on GitHub"
          data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
        />
      </a>
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} sm={12} md={12} className={props.classes.header}>
          <Typography
            variant="display1"
            className={props.classes.title}
            gutterBottom
          >
            Family Finance
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={5} lg={4}>
          <Login
            onLoginEmail={props.startLoginWithEmail}
            onLoginGoogle={props.startLoginGoogle}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} lg={4}>
          <SignUp onSignup={props.startSignUp} />
        </Grid>
        <Grid item xs={12} sm={8} md={5} lg={4}>
          <DemoStarter onDemo={() => props.startDemo("demo")} />
        </Grid>
      </Grid>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  startLoginGoogle: () => dispatch(startLoginGoogle()),
  startSignUp: (email, password) => dispatch(startSignUp(email, password)),
  startLoginWithEmail: (email, password) =>
    dispatch(startLoginWithEmail(email, password)),
  startDemo: type => dispatch(startDemo(type))
});

export default withStyles(styles)(
  connect(undefined, mapDispatchToProps)(HomePage)
);

/*
<Grid item xs={12} sm={10} md={4} lg={4}>
                    <LoginGoogle onLoginGoogle={props.startLoginGoogle}/>
                </Grid> */
