import React from "react";
import { withStyles } from "material-ui/styles";

import { CircularProgress } from "material-ui/Progress";

const styles = theme => ({
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "-50px 0px 0px -50px"
  },
  divclass: {
    textAlign: "center"
  }
});

const LoadProgress = props => {
  const { classes } = props;
  return (
    <div className={classes.divclass}>
      <CircularProgress className={classes.progress} size={200} />
    </div>
  );
};

export default withStyles(styles)(LoadProgress);
