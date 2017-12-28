import React from 'react';
import {connect} from 'react-redux';
import AccountListItem from './AccountListItem';
import {startDeleteAccount} from '../actions/accounts'

export class AccountList extends React.Component {
    onDelete = (id) => {
        this
            .props
            .startDeleteAccount(id);
    };
    render() {
        return (
            <div>
                {this.props.accounts.lenght === 0
                    ? (
                        <p>no accounts</p>
                    )
                    : (this.props.accounts.map((account) => {
                        return <AccountListItem key={account.id} onDelete={this.onDelete} {...account}/>
                    }))
}
            </div>

        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        accounts: state.accounts,
        ...props
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startDeleteAccount: (data) => dispatch(startDeleteAccount(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList)