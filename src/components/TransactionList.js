import React from 'react';
import {connect} from 'react-redux';
import TransactionListItem from './TransactionListItem';
import {startDeleteTransaction} from '../actions/transactions';

class TransactionList extends React.Component {

    onDelete = (id) => {
        this
            .props
            .startDeleteTransaction(id);
    };

    render() {
        return (
            <div>
                {this.props.transactions.lenght === 0
                    ? (
                        <p>no transaction</p>
                    )
                    : (this.props.transactions.map((transaction) => {
                        return <TransactionListItem
                            key={transaction.id}
                            onDelete={this.onDelete}
                            {...transaction}/>
                    }))
}
            </div>

        )
    }
}
const mapStateToProps = (state) => {
    return {transactions: state.transactions};
};

const mapDispatchToProps = (dispatch, props) => ({
    startDeleteTransaction: (data) => dispatch(startDeleteTransaction(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList)