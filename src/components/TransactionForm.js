import React from 'react';

export default class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.transaction
                ? props.transaction.description
                : '',
            amount: props.transaction
                ? props.transaction.amount
                : '',
            account: props.transaction
                ? props.transaction.account
                : '',
            date: props.transaction
                ? props.transaction.date
                : '',
            error: ''
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

        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}/>
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}/>
                    <input
                        type="text"
                        placeholder="Account"
                        value={this.state.account}
                        onChange={this.onAccountChange}/>
                    <input
                        type="text"
                        placeholder="date"
                        value={this.state.date}
                        onChange={this.onDateChange}/>

                    <button>Add Transaction</button>
                </form>
            </div>
        )
    }

}
