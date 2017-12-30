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

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.account
                ? props.account.name
                : '',
            balance: props.account
                ? (props.account.balance / 100).toString()
                : '',
            error: '',
            submit_button_title: props.account
                ? 'Update'
                : 'Add'
        };
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.balance) {
            this.setState(() => ({error: 'Please provide name and balance.'}));
        } else {
            this.setState(() => ({error: ''}));
            this
                .props
                .onSubmit({
                    name: this.state.name,
                    balance: parseFloat(this.state.balance, 10) * 100
                });
        }
    };

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    };

    onBalanceChange = (e) => {
        const balance = e.target.value;

        if (!balance || balance.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({balance}));
        }
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
                        placeholder="name"
                        autoFocus
                        value={this.state.name}
                        onChange={this.onNameChange}/>
                    <TextField
                        className={classes.textField}
                        type="text"
                        placeholder="Balance"
                        value={this.state.balance}
                        onChange={this.onBalanceChange}/>

                    <Button
                        onClick={this.onSubmit}
                            className={classes.button}
                        raised
                        color="primary">{this.state.submit_button_title}</Button>
                </form>
            </div>
        )
    }

}

export default withStyles(styles)(AccountForm);