import React from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import moment from 'moment';


const TransactionListItem = ({id, account, amount , date , description}) => (
    <div>
        <Link to={`/accounts/edit/${id}`}>
            <h3>{numeral(amount / 100).format('€0,0.00')}</h3>
        </Link>
        <p>
            {description} - {moment.unix(date).format('MMMM Do, YYYY')} - {account}
        </p>
    </div>
);


export default TransactionListItem;