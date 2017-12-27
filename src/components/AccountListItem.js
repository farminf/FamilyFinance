import React from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';

const AccountListItems = ({id, name, balance}) => (
    <div>
        <Link to={`/accounts/edit/${id}`}>
            <h3>{name}</h3>
        </Link>
        <p>
            {numeral(balance / 100).format('€0,0.00')}
        </p>
    </div>
);


export default AccountListItems;