import React from "react";
import numeral from "numeral";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router-dom";

const ITEM_HEIGHT = 48;

export class AccountListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  deleteAccount = () => {
    this.props.onDelete({ name: this.props.name });
  };

  editAccount = () => {
    this.props.history.push("/accounts/edit/" + this.props.name);
    this.setState({ anchorEl: null });
  };

  copyAccount = () => {
    this.props.onCopy(this.props.name);
    this.setState({ anchorEl: null });
  };

  render() {
    let open = Boolean(this.state.anchorEl);
    return (
      <TableRow key={this.props.name}>
        <TableCell>{this.props.name}</TableCell>
        <TableCell numeric>
          {numeral(this.props.balance / 100).format("€ 0,0.00")}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="More"
            aria-owns={open ? "long-menu" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreVertIcon />
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
            }}
          >
            {/*<button onClick={this.deleteAccount}>Remove</button>
                        <Link to={`/accounts/edit/${this.props.id}`}>
                            <button >Edit</button>
                        </Link>*/}
            <MenuItem key="Edit" onClick={this.editAccount}>
              Edit
            </MenuItem>

            <MenuItem key="Remove" onClick={this.deleteAccount}>
              Remove
            </MenuItem>

            {/*<MenuItem key='Copy' onClick={this.copyAccount}>
                            Copy
                        </MenuItem>*/}
          </Menu>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(AccountListItems);
