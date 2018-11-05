import React from "react";
import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    position: "absolute",
    top: "45%",
    left: "50%",
    right: "45%",
    margin: "-50px 0px 0px -50px"
  },
  divclass: {
    textAlign: "center"
  }
});

export const LoadProgress = props => {
  const { classes } = props;
  return (
    <div className={classes.divclass}>
      <CircularProgress className={classes.progress} size={150} />
    </div>
  );
};

export default withStyles(styles)(LoadProgress);
