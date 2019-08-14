import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import Paper from "@material-ui/core/Paper";

export const styles = theme => ({
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

export class MyPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: []
    };
  }

  getRandomColor = categoriesNumber => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    let colors = [];
    while (colors.length < categoriesNumber) {
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colors.push(color);
      color = "#";
    }
    this.setState({
      colors
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.getRandomColor(nextProps.data.length);
  }

  renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  render() {
    //const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={4}>
        <h3>{this.props.title}</h3>
        <div className={classes.root}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={this.props.data}
                dataKey={this.props.dataKey}
                nameKey={this.props.nameKey}
                cx="50%"
                cy="40%"
                outerRadius={120}
                fill="#8884d8"
                label={this.renderCustomizedLabel}
                labelLine={false}
                unit="€"
              >
                {this.props.data.map((entry, index) => (
                  <Cell key={index} fill={this.state.colors[index]} unit="€" />
                ))}
              </Pie>
              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(MyPieChart);
