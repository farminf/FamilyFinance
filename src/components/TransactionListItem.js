import React from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';

class TransactionListItem extends React.Component {

    deleteTransaction = () =>{
        this.props.onDelete ({id :this.props.id}); 
    };

    render() {
        return (
            <div>
                <Link to={`/transactions/edit/${this.props.id}`}>
                    <h3>{this.props.description}</h3>
                </Link>
                <p>
                    {numeral(this.props.amount / 100).format('€ 0,0.00')}
                    - {moment
                        .unix(this.props.date)
                        .format('MMMM Do, YYYY')}
                    - {this.props.account}
                </p>
                <button onClick={this.deleteTransaction}>Remove</button>
            </div>
        )

    }
}
export default TransactionListItem;