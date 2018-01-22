import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';

const styles = theme => ({
    root: {
        position: "relative",
        textAlign: "left"
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
        }),
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 100,
        padding: 10
    },
    dateFormControl: {
        margin: theme.spacing.unit,
        marginTop: 10,
        minWidth: 200,
        padding: 10
    }
});

class FilterDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardMonthFilter: props.dashboardMonthFilter
            ? props.dashboardMonthFilter
            : '',
            dashboardYearFilter: props.dashboardYearFilter
            ? props.dashboardYearFilter
            : ''
        };
    }

    onDashboardMonthFilterChange = (e) => {
        const dashboardMonthFilter = e.target.value;
        this.setState({
            dashboardMonthFilter
        }, () => {
            this
                .props
                .onFilterDashboard(this.state)
        });
    }

    onDashboardYearFilterChange = (e) => {
        const dashboardYearFilter = e.target.value;
        this.setState({
            dashboardYearFilter
        }, () => {
            this
                .props
                .onFilterDashboard(this.state)
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper} elevation={4}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="type-native-simple">Month</InputLabel>
                    <Select
                        native
                        value={this.state.dashboardMonthFilter}
                        onChange={this.onDashboardMonthFilterChange}
                        input={< Input id = "type-native-simple" />}>
                        <option key="all" value=""></option>
                        <option key="january" value="01">January</option>
                        <option key="february" value="02">February</option>
                        <option key="march" value="03">March</option>
                        <option key="april" value="04">April</option>
                        <option key="may" value="05">May</option>
                        <option key="june" value="06">June</option>
                        <option key="july" value="07">July</option>
                        <option key="august" value="08">August</option>
                        <option key="september" value="09">September</option>
                        <option key="october" value="10">October</option>
                        <option key="november" value="11">November</option>
                        <option key="december" value="12">December</option>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="type-native-simple">Year</InputLabel>
                    <Select
                        native
                        value={this.state.dashboardYearFilter}
                        onChange={this.onDashboardYearFilterChange}
                        input={< Input id = "type-native-simple" />}>
                        <option key="all" value=""></option>
                        <option key="2017" value="2017">2017</option>
                        <option key="2018" value="2018">2018</option>

                    </Select>
                </FormControl>
            </Paper>
        )
    }
}

export default withStyles(styles)(FilterDashboard);
