import React from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl} from 'material-ui/Form';
import {connect} from 'react-redux';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import '../react_dates_overrides.css'
import Paper from 'material-ui/Paper';


const styles = theme => ({

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: 250,
        padding: 10
    },

    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
        marginTop: theme.spacing.unit,
        marginBottom: 40,
        
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 250,
        padding: 10
    },
    dateFormControl: {
        margin: theme.spacing.unit,
        marginTop: 10,
        minWidth: 250,
        padding: 10
    },
    paper: theme
        .mixins
        .gutters({

            paddingLeft: 0,
            paddingRight: 0,
            marginTop: theme.spacing.unit * 3,
            marginLeft: 10,
            marginRight: 10,
            overflowX: 'auto'
        })
});

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.transaction
                ? props.transaction.type
                : '',
            description: props.transaction
                ? props.transaction.description
                : '',
            amount: props.transaction
                ? (props.transaction.amount / 100).toString()
                : '',
            account: props.transaction
                ? props.transaction.account
                : '',
            category: props.transaction
                ? props.transaction.category
                : '',
            date: props.transaction
                ? moment(props.transaction.date)
                : moment(),
            error: '',
            calendarFocused: false,
            submit_button_title: props.transaction
                ? 'Update'
                : 'Add'
        };
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount || !this.state.account || !this.state.date || !this.state.type || !this.state.category) {
            this.setState(() => ({error: 'Please provide all required data.'}));
        } else {
            this.setState(() => ({error: ''}));
            this
                .props
                .onSubmit({
                    type: this.state.type,
                    description: this.state.description,
                    amount: parseFloat(this.state.amount, 10) * 100,
                    account: this.state.account,
                    category: this.state.category,
                    date: this
                        .state
                        .date
                        .valueOf()
                });
        }
    };
    onTypeChange = (e) => {
        const type = e.target.value;
        this.setState(() => ({type}));
    };

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    };

    onAmountChange = (e) => {
        const amount = e.target.value;

        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({amount}));
        }
    };

    onAccountChange = (e) => {
        const account = e.target.value;
        this.setState(() => ({account}));
    };

    onCategoryChange = (e) => {
        const category = e.target.value;
        this.setState(() => ({category}));
    };

    onDateChange = (date) => {
        //const date = e.target.value;
        this.setState(() => ({date}));
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.paper} elevation={4}>

                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <FormControl className={classes.dateFormControl}>
                        <SingleDatePicker
                            date={this.state.date}
                            onDateChange={this.onDateChange}
                            focused={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={() => false}/>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Type</InputLabel>
                        <Select
                            native
                            value={this.state.type}
                            onChange={this.onTypeChange}
                            input={< Input id = "age-native-simple" />}>
                            <option key=""></option>
                            <option key="expense" value="Expense">Expense</option>
                            <option key="income" value="Income">Income</option>

                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.textField}
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}/>

                    <TextField
                        className={classes.textField}
                        type="text"
                        placeholder="description"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}/>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Account</InputLabel>
                        <Select
                            native
                            value={this.state.account}
                            onChange={this.onAccountChange}
                            input={< Input id = "age-native-simple" />}>
                            <option value=""/> {this
                                .props
                                .accounts
                                .map((account) => {
                                    return <option key={account.name} value={account.name}>{account.name}</option>
                                })}

                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Category</InputLabel>
                        <Select
                            native
                            value={this.state.category}
                            onChange={this.onCategoryChange}
                            input={< Input id = "age-native-simple" />}>
                            <option value=""/> {this
                                .props
                                .categories
                                .map((category) => {
                                    return <option key={category.name} value={category.name}>{category.name}</option>
                                })}

                        </Select>
                    </FormControl>

                    {/*<TextField
                        className={classes.textField}
                        type="text"
                        placeholder="Account"
                        value={this.state.account}
                    onChange={this.onAccountChange}/>

                 <TextField
                        className={classes.textField}
                        type="date"
                        placeholder="date"
                        value={moment
                        .unix(this.state.date)
                        .format("DD/mm/YYYY")}
                        onChange={this.onDateChange}/>*/}

                    <Button
                        onClick={this.onSubmit}
                        className={classes.button}
                        raised
                        color="primary">
                        {/*<Save className={classes.leftIcon}/> */}
                        {this.state.submit_button_title}
                    </Button>
                </form>
            </Paper>
        )
    }

}

const mapStateToProps = (state) => {
    return {accounts: state.accounts, categories: state.categories};
};

export default connect(mapStateToProps)(withStyles(styles)(TransactionForm));