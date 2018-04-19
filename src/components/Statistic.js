import React from "react";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Card, { CardContent } from "material-ui/Card";

const styles = theme => ({
  root: {
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    padding: 10,
    height: 400,
    backgroundColor: "#fff"
  },
  paper: theme.mixins.gutters({
    boxSizing: "border - box",
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: theme.spacing.unit,
    overflowX: "auto"
  }),
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const Statistic = ({
  classes,
  variableName,
  variableValue,
  variableName2,
  variableValue2
}) => {
  return (
    <Paper className={classes.paper} elevation={4}>
      <div className={classes.root}>
        <h3>Month Total Stats</h3>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="title" component="h2">
              {variableName}
            </Typography>

            <Typography variant="display2" color="error">
              {variableValue}
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="title" component="h2">
              {variableName2}
            </Typography>

            <Typography variant="display2" color="textSecondary">
              {variableValue2}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Statistic);
