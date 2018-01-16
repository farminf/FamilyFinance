import React from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
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
        marginBottom: theme.spacing.unit
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
                : 'Add',
            disableName: props.account
                ? true
                : false
        };
    };

    onSubmit = (e) => {

        e.preventDefault();

        if (!this.state.name || !this.state.balance) {
            this.setState(() => ({error: 'Please provide name and balance.'}));
        } else {
            if (this.props.accounts.find((account) => account.name === this.state.name) === undefined) {
                this.setState(() => ({error: ''}));
                this
                    .props
                    .onSubmit({
                        name: this.state.name,
                        balance: parseFloat(this.state.balance, 10) * 100
                    });
            } else {
                this.setState(() => ({name: '', balance: '' , error: 'Account already exists'}));
            }
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
            <Paper className={classes.paper} elevation={4}>

                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <TextField
                        required
                        disabled={this.state.disableName}
                        className={classes.textField}
                        type="text"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.onNameChange}/>
                    <TextField
                        required
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
            </Paper>
        )
    }

}
const mapStateToProps = (state, props) => {
    return {accounts: state.accounts};
};

export default connect(mapStateToProps)(withStyles(styles)(AccountForm));