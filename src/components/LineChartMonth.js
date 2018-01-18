import React from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import {
    LineChart,
    Line,
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
        height: 400,
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
const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400
    }, {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210
    }, {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290
    }, {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000
    }, {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181
    }, {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500
    }, {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];

class LineChartMonth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData :[]
        }
    }

    componentWillMount() {
    //     let memo = [];
    //    let f = this.props.transactions
    //     .reduce((memo, obj) => {
    //         memo[obj.name = obj.date] += obj.amount;
    //         return memo; 
    //     }, {})

    //     f.map((amount, date) => ({date, amount}))   
    //     .value();
        
    }

    render() {

        const {classes} = this.props;
        return (
            <Paper className={classes.paper} elevation={4}>
                <div className={classes.root}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {transactions: state.transactions};
};

export default connect(mapStateToProps)(withStyles(styles)(LineChartMonth))