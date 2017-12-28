import React from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import { TableCell, TableRow} from 'material-ui/Table';

class AccountListItems extends React.Component {
    deleteAccount = () => {
        this
            .props
            .onDelete({id: this.props.id});
    }

    render() {
        return (

                <TableRow key={this.props.id}>
                    <TableCell>{this.props.name}</TableCell>
                    <TableCell numeric>{numeral(this.props.balance / 100).format('€ 0,0.00')}</TableCell>
                    <TableCell>
                        <button onClick={this.deleteAccount}>Remove</button>
                        <Link to={`/accounts/edit/${this.props.id}`}>
                            <button >Edit</button>
                        </Link>
                    </TableCell>
                </TableRow>

                
        )
    }
}

export default AccountListItems;