import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  input: {
    display: "none"
  },
  paper: theme.mixins.gutters({
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: theme.spacing.unit * 3,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "rgba(255,255,255,0.7)"
  }),

  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

class DemoStarter extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={4}>
        <Typography variant="headline">Try Demo First</Typography>
        <Button
          onClick={this.props.onDemo}
          variant="raised"
          className={classes.button}
        >
          Start
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(DemoStarter);
