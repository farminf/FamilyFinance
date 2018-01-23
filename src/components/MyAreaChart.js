import React from 'react';
import {withStyles} from 'material-ui/styles';
import {
    Area,
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        WebkitBoxSizing: "border-box",
        MozBoxSizing: "border-box",
        padding: 10,
        height: 300,
        backgroundColor: "#fff"
    },
    paper: theme
        .mixins
        .gutters({

            boxSizing: "border - box",
            paddingLeft: 16,
            paddingRight: 16,
            marginTop: theme.spacing.unit * 3,
            marginLeft: 10,
            marginRight: 10,
            overflowX: 'auto'
        })
});

class MyAreaChart extends React.Component {

    render() {

        const {classes} = this.props;
        return (
            <Paper className={classes.paper} elevation={4}>
                <h3>{this.props.title}</h3>
                <div className={classes.root}>

                    <ResponsiveContainer>
                        <AreaChart data={this.props.data}>
                            {/*<Line type="monotone" dataKey="amount" stroke="#8884d8"/>*/}
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                            <XAxis dataKey={this.props.xAxis}/>
                            <YAxis/>
                            <Tooltip />
                            <Area
                                type='monotone'
                                dataKey={this.props.yAxis}
                                stroke={this.props.lineColor}
                                fill={this.props.fillColor}
                                unit="€"
                                
                                />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(MyAreaChart);