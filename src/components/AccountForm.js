import React from 'react';

export default class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.account
                ? props.account.name
                : '',
            balance: props.account
                ? props.account.balance
                : '',

            error: ''
        };
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.balance) {
            this.setState(() => ({ error: 'Please provide name and balance.' }));
          } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit({
              name: this.state.name,
              balance: parseFloat(this.state.balance, 10) * 100,
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

        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        placeholder="name"
                        autoFocus
                        value={this.state.name}
                        onChange={this.onNameChange}/>
                    <input
                        type="text"
                        placeholder="Balance"
                        value={this.state.balance}
                        onChange={this.onBalanceChange}/>

                    <button>Add Account</button>
                </form>
            </div>
        )
    }

}
