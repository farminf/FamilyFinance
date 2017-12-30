import React from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

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
                ? props.transaction.date
                : '',
            error: '',
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
                    date: this.state.date
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

    onDateChange = (e) => {
        const date = e.target.value;
        this.setState(() => ({date}));
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
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
                    <TextField
                        className={classes.textField}
                        type="text"
                        placeholder="Account"
                        value={this.state.account}
                        onChange={this.onAccountChange}/>
                    <TextField
                        className={classes.textField}
                        type="text"
                        placeholder="date"
                        value={this.state.date}
                        onChange={this.onDateChange}/>

                    <Button onClick={this.onSubmit} className={classes.button} raised color="primary">
                        {/*<Save className={classes.leftIcon}/> */}
                        {this.state.submit_button_title}
                    </Button>
                </form>
            </div>
        )
    }

}

export default withStyles(styles)(TransactionForm);