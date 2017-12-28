import React from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';

class AccountListItems extends React.Component {
    deleteAccount = () =>{
        this.props.onDelete ({id :this.props.id}); 
    }

    render() {
        return (
            <div>
                <Link to={`/accounts/edit/${this.props.id}`}>
                    <h3>{this.props.name}</h3>
                </Link>
                <p>
                    {numeral(this.props.balance / 100).format('€0,0.00')}
                </p>
                <button onClick={this.deleteAccount} >Remove</button>

            </div>
        )
    }
}

export default AccountListItems;