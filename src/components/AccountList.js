import React from 'react';
import {connect} from 'react-redux';
import AccountListItem from './AccountListItem';
import {startDeleteAccount} from '../actions/accounts';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    }
});

export class AccountList extends React.Component {

    onDelete = (id) => {
        this
            .props
            .startDeleteAccount(id);
    };
    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.props.accounts.lenght === 0
                    ? (
                        <p>no accounts</p>
                    )
                    : (
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Account</TableCell>
                                    <TableCell numeric>Balance</TableCell>
                                    <TableCell >Options</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this
                                    .props
                                    .accounts
                                    .map((account) => {
                                        return <AccountListItem key={account.id} onDelete={this.onDelete} {...account}/>
                                    })
}
                            </TableBody>
                        </Table>
                    )
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountList))