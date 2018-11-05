import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router-dom";

const ITEM_HEIGHT = 48;

export class CategoryListItem extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  deleteCategory = () => {
    this.props.onDelete({ id: this.props.id });
  };

  copyCategory = () => {
    this.props.onCopy(this.props.id);
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    return (
      <TableRow key={this.props.id}>
        <TableCell>{this.props.name}</TableCell>
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

            <MenuItem key="Remove" onClick={this.deleteCategory}>
              Remove
            </MenuItem>

            {/*<MenuItem key='Copy' onClick={this.copyCategory}>
                            Copy
                        </MenuItem>*/}
          </Menu>
        </TableCell>
      </TableRow>
    );
  }
}

export default withRouter(CategoryListItem);
