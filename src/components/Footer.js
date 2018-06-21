import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CopyrightIcon from "react-icons/lib/fa/copyright";
// import purple from '@material-ui/core/colors/purple'; const textColor =
// purple['50'];

const styles = theme => ({
  footer: {
    backgroundColor: "#929192",
    textAlign: "center",
    left: "0",
    bottom: "0",
    width: "100%",
    height: 30,
    paddingTop: 10,
    paddingBottom: 0,
    position: "fixed"
  },
  note: {
    verticalAlign: "middle",
    color: "#FFFFFF"
  },
  icon: {
    marginRight: 5
  }
});

const Footer = props => {
  const { classes } = props;
  return (
    <div className={classes.footer}>
      <Typography
        type="body1"
        className={classes.note}
        align="center"
        color="inherit"
      >
        <CopyrightIcon size={30} className={classes.icon} />
        2018 Family Finance
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Footer);
