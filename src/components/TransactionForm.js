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

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        width: 200
    },
    menu: {
        width: 200
    },
    button: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
        marginTop: theme.spacing.unit
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    }
});

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.transaction
                ? props.transaction.description
                : '',
            amount: props.transaction
                ? (props.transaction.amount / 100).toString()
                : '',
            account: props.transaction
                ? props.transaction.account
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
        if (!this.state.description || !this.state.amount || !this.state.account || !this.state.date) {
            this.setState(() => ({error: 'Please provide all required data.'}));
        } else {
            this.setState(() => ({error: ''}));
            this
                .props
                .onSubmit({
                    description: this.state.description,
                    amount: parseFloat(this.state.amount, 10) * 100,
                    account: this.state.account,
                    date: this.state.date.valueOf()
                });
        }
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
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <SingleDatePicker
                        date={this.state.date}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}/>

                    <TextField
                        className={classes.textField}
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}/>
                    <TextField
                        className={classes.textField}
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}/>

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
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {accounts: state.accounts};
};

export default connect(mapStateToProps)(withStyles(styles)(TransactionForm));