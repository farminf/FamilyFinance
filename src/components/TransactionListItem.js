import React from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';
import { TableCell, TableRow} from 'material-ui/Table';


class TransactionListItem extends React.Component {

    deleteTransaction = () => {
        this
            .props
            .onDelete({id: this.props.id});
    };

    render() {
        return (
            <TableRow key={this.props.id}>
                <TableCell>{this.props.description}</TableCell>
                <TableCell numeric>{numeral(this.props.amount / 100).format('€ 0,0.00')}</TableCell>
                <TableCell>{moment
                        .unix(this.props.date)
                        .format('MMMM Do, YYYY')}</TableCell>
                <TableCell>{this.props.account}</TableCell>
                <TableCell>
                    <button onClick={this.deleteTransaction}>Remove</button>
                    <Link to={`/transactions/edit/${this.props.id}`}>
                        <button >Edit</button>
                    </Link>
                </TableCell>
            </TableRow>
        )
    }
}
export default TransactionListItem;