import React from 'react';
import {connect} from 'react-redux';
import TransactionListItem from './TransactionListItem';

const TransactionList = (props) => (
    <div>
        {props.transactions.lenght === 0
            ? (
                <p>no transaction</p>
            )
            : (props.transactions.map((transaction) => {
                return <TransactionListItem key={transaction.id} {...transaction}/>
            }))
}
    </div>

)

const mapStateToProps = (state) => {
    return {transactions: state.transactions};
};

export default connect(mapStateToProps)(TransactionList)