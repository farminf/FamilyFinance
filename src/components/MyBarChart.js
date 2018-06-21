import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    WebkitBoxSizing: "border-box",
    MozBoxSizing: "border-box",
    padding: 10,
    height: 380,
    backgroundColor: "#fff"
  },
  paper: theme.mixins.gutters({
    boxSizing: "border - box",
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: theme.spacing.unit,

    overflowX: "auto"
  })
});

class MyBarChart extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={4}>
        <h3>{this.props.title}</h3>
        <div className={classes.root}>
          <ResponsiveContainer>
            <BarChart data={this.props.data}>
              {/*<Line type="monotone" dataKey="amount" stroke="#8884d8"/>*/}
              <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
              <XAxis dataKey={this.props.xAxis}>
                {/*<Label value={this.props.xAxis} offset={0} position="bottom"/>*/}
              </XAxis>
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={26} />
              <Bar
                dataKey={this.props.yAxis1}
                fill={this.props.fillColor1}
                unit="€"
              />
              <Bar
                dataKey={this.props.yAxis2}
                fill={this.props.fillColor2}
                unit="€"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(MyBarChart);
