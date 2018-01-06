import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import {TableCell, TableRow} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import {withRouter} from "react-router-dom";

const ITEM_HEIGHT = 48;
class TransactionListItem extends React.Component {
    state = {
        anchorEl: null
    };
    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    deleteTransaction = () => {
        this
            .props
            .onDelete({id: this.props.id});
        this.setState({anchorEl: null});
    };

    editTransaction = () => {
        this
            .props
            .history
            .push('/transactions/edit/' + this.props.id);
        this.setState({anchorEl: null});
    };

    copyTransaction = () => {
        this
            .props
            .onCopy(this.props.id);
        this.setState({anchorEl: null});
    };

    render() {
        const open = Boolean(this.state.anchorEl);
        return (
            <TableRow key={this.props.id}>
                <TableCell>{this.props.type}</TableCell>
                <TableCell>{this.props.description}</TableCell>
                <TableCell numeric>{numeral(this.props.amount / 100).format('€ 0,0.00')}</TableCell>
                <TableCell>{moment(this.props.date).format('MMMM Do, YYYY')}</TableCell>
                <TableCell>{this.props.account}</TableCell>
                <TableCell>{this.props.category}</TableCell>

                <TableCell>
                    <IconButton
                        aria-label="More"
                        aria-owns={open
                        ? 'long-menu'
                        : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}>
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={this.state.anchorEl}
                        open={open}
                        onClose={this.handleClose}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200
                        }
                    }}>
                        {/*<Link to={`/transactions/edit/${this.props.id}`}></Link>*/}
                        <MenuItem key='Edit' onClick={this.editTransaction}>
                            Edit
                        </MenuItem>

                        <MenuItem key='Remove' onClick={this.deleteTransaction}>
                            Remove
                        </MenuItem>

                        <MenuItem key='Copy' onClick={this.copyTransaction}>
                            Copy
                        </MenuItem>

                    </Menu>

                </TableCell>
            </TableRow>
        )
    }
}
export default withRouter(TransactionListItem);