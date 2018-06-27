import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

export const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 250,
    padding: 10
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  paper: theme.mixins.gutters({
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  })
});

export class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.account ? props.account.name : "",
      balance: props.account ? (props.account.balance / 100).toString() : "",
      error: "",
      submit_button_title: props.account ? "Update" : "Add",
      disableName: props.account ? true : false
    };
  }

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.name || !this.state.balance) {
      this.setState(() => ({ error: "Please provide name and balance." }));
    } else {
      if (
        typeof this.props.accounts !== "undefined" &&
        this.props.accounts.length > 0
      ) {
        if (
          this.props.accounts.find(
            account => account.name === this.state.name
          ) === undefined
        ) {
          this.setState(() => ({ error: "" }));
          this.props.onSubmit({
            name: this.state.name,
            balance: parseFloat(this.state.balance, 10) * 100
          });
        } else {
          if (this.state.submit_button_title === "Update") {
            this.props.onSubmit({
              name: this.state.name,
              balance: parseFloat(this.state.balance, 10) * 100
            });
          } else {
            this.setState(() => ({
              name: "",
              balance: "",
              error: "This Account already exists"
            }));
          }
        }
      } else {
        this.setState(() => ({ error: "" }));
        this.props.onSubmit({
          name: this.state.name,
          balance: parseFloat(this.state.balance, 10) * 100
        });
      }
    }
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onBalanceChange = e => {
    const balance = e.target.value;

    if (!balance || balance.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ balance }));
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={4}>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
          <TextField
            required
            disabled={this.state.disableName}
            className={classes.textField}
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <TextField
            required
            className={classes.textField}
            type="text"
            placeholder="Balance"
            value={this.state.balance}
            onChange={this.onBalanceChange}
          />

          <Button
            onClick={this.onSubmit}
            className={classes.button}
            variant="raised"
            color="primary"
          >
            {this.state.submit_button_title}
          </Button>
        </form>
      </Paper>
    );
  }
}
const mapStateToProps = (state, props) => {
  return { accounts: state.accounts };
};

export default connect(mapStateToProps)(withStyles(styles)(AccountForm));
