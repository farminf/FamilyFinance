import React from 'react';
import {connect} from 'react-redux';
import AccountListItem from './AccountListItem';

const AccountList = (props) => (
    <div>
        {props.accounts.lenght === 0
            ? (
                <p>no accounts</p>
            )
            : (props.accounts.map((account) => {
                return <AccountListItem key={account.id} {...account}/>
            }))
}
    </div>

)

const mapStateToProps = (state) => {
    return {accounts: state.accounts};
};

export default connect(mapStateToProps)(AccountList)