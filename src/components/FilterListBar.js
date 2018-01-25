import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';

// import moment from 'moment';
// import {SingleDatePicker} from 'react-dates';

const styles = theme => ({
    root: {
        position: "relative",
        textAlign: "left"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: 150,
        padding: 10
    },

    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 100,
        right: 10,
        top: 30,
        position: "absolute"
    },
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

class FilterListBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeFilter: props.filters.typeFilter
            ? props.filters.typeFilter
            : '',
            descriptionFilter: props.filters.descriptionFilter
            ? props.filters.descriptionFilter
            : '',
        };
    }

    onTypeFilerChange = (e) => {
        const typeFilter = e.target.value;
        this.setState({
            typeFilter
        }, () => {
            this
                .props
                .onFilter(this.state)
        });

    }

    onDescriptionFilter = (e) => {
        const descriptionFilter = e.target.value;
        this.setState({
            descriptionFilter
        }, () => {
            this
                .props
                .onFilter(this.state)
        })

    }

    onFilter = () => {
        this
            .props
            .onFilter(this.state)
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="type-native-simple">Type</InputLabel>
                    <Select
                        native
                        value={this.state.typeFilter}
                        onChange={this.onTypeFilerChange}
                        input={< Input id = "type-native-simple" />}>
                        <option key="all" value=""></option>
                        <option key="expense" value="Expense">Expense</option>
                        <option key="income" value="Income">Income</option>
                        <option key="transfer" value="Transfer">Transfer</option>
                    </Select>
                </FormControl>
                <TextField
                    className={classes.textField}
                    type="text"
                    placeholder="Description"
                    value={this.state.descriptionFilter}
                    onChange={this.onDescriptionFilter}/>

                {/*<Button onClick={this.onFilter} className={classes.button} raised>
                    Filter
        </Button>*/}
            </div>
        )
    }
}

export default(withStyles(styles)(FilterListBar))
