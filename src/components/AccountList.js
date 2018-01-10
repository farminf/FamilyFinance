import React from 'react';
import {connect} from 'react-redux';
import AccountListItem from './AccountListItem';
import {startDeleteAccount, startAddAccount} from '../actions/accounts';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    table: {
        minWidth: 500,
        
    }
});

export class AccountList extends React.Component {

    onDelete = (name) => {
        this
            .props
            .startDeleteAccount(name);
    };

    onCopy = (name) => {
        this
            .props
            .accounts
            .map((account) => {
                if (account.name === name) {
                    return this
                        .props
                        .startAddAccount({...account , name:account.name+'-copy'});
                } 
                else {
                    return null
                }
            })

    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.props.accounts.lenght === 0 || this.props.accounts.hasOwnProperty(0) === false
                    ? (
                        <p>no accounts</p>
                    )
                    : (
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Account</TableCell>
                                    <TableCell numeric>Balance</TableCell>
                                    <TableCell ></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this
                                    .props
                                    .accounts
                                    .map((account) => {
                                        return <AccountListItem 
                                            key={account.name} 
                                            onDelete={this.onDelete}
                                            onCopy={this.onCopy}
                                            {...account}/>
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
    startAddAccount: (account) => dispatch(startAddAccount(account)),
    startDeleteAccount: (data) => dispatch(startDeleteAccount(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountList))