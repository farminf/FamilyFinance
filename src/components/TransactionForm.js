import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import "../react_dates_overrides.css";
//import Paper from '@material-ui/core/Paper';
import _ from "lodash";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 250,
    padding: 0
  },

  button: {
    margin: theme.spacing.unit,
    minWidth: 250,
    marginBottom: 5,
    padding: 5
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
    padding: 0
  },
  dateFormControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
    padding: 0
  },
  paper: theme.mixins.gutters({
    paddingLeft: 0,
    paddingRight: 0,
    overflowX: "auto"
  })
});

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.transaction ? props.transaction.type : "",
      description: props.transaction ? props.transaction.description : "",
      amount: props.transaction
        ? (props.transaction.amount / 100).toString()
        : "",
      account: props.transaction ? props.transaction.account : "",
      category: props.transaction ? props.transaction.category : "",
      date: props.transaction
        ? moment(props.transaction.date)
        : moment()
            .set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
            .get("today"),
      error: "",

      transferFrom: props.transaction ? props.transaction.transferFrom : "",
      transferTo: props.transaction ? props.transaction.transferTo : "",
      disableType:
        props.transaction && props.transaction.type === "Transfer"
          ? true
          : false,
      calendarFocused: false,
      submit_button_title: props.transaction ? "Update" : "Add"
    };
  }

  onSubmit = e => {
    e.preventDefault();
    if (
      !this.state.description ||
      !this.state.amount ||
      !this.state.account ||
      !this.state.date ||
      !this.state.type ||
      !this.state.category
    ) {
      this.setState(() => ({ error: "Please provide all required data." }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        type: this.state.type,
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        account: this.state.account,
        category: this.state.category,
        date: this.state.date.valueOf()
      });
    }
  };

  onTransferSubmit = e => {
    e.preventDefault();
    if (
      !this.state.amount ||
      !this.state.transferFrom ||
      !this.state.transferTo ||
      !this.state.date ||
      !this.state.type
    ) {
      this.setState(() => ({ error: "Please provide all required data." }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        type: this.state.type,
        description: "Transfer",
        amount: parseFloat(this.state.amount, 10) * 100,
        account: this.state.transferFrom + " > " + this.state.transferTo,
        transferFrom: this.state.transferFrom,
        transferTo: this.state.transferTo,
        category: "Transfer",
        date: this.state.date.valueOf()
      });
    }
  };
  onTypeChange = e => {
    const type = e.target.value;
    this.setState(() => ({ type }));
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onAmountChange = e => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onAccountChange = e => {
    const account = e.target.value;
    this.setState(() => ({ account }));
  };

  onTransferFromChange = e => {
    const transferFrom = e.target.value;
    this.setState(() => ({ transferFrom }));
  };

  onTransferToChange = e => {
    const transferTo = e.target.value;
    this.setState(() => ({ transferTo }));
  };

  onCategoryChange = e => {
    const category = e.target.value;
    this.setState(() => ({ category }));
  };

  onDateChange = d => {
    if (d !== null) {
      const date = d.get("today");
      this.setState(() => ({ date }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.accounts.hasOwnProperty(0) === false ? (
          <div>
            <p>Please create an account first</p>
            <Button
              onClick={this.props.onClose}
              className={classes.button}
              variant="raised"
            >
              Ok
            </Button>
          </div>
        ) : (
          <form onSubmit={this.onSubmit}>
            <FormControl className={classes.dateFormControl}>
              {/*InputLabel htmlFor="age-native-date">Date</InputLabel>*/}
              <SingleDatePicker
                id="age-native-date"
                block={true}
                showDefaultInputIcon={true}
                date={this.state.date}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                displayFormat="DD MMM YYYY"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-type">Type</InputLabel>
              <Select
                disabled={this.state.disableType}
                native
                value={this.state.type}
                onChange={this.onTypeChange}
                input={<Input id="age-native-type" />}
              >
                <option key="" />
                <option key="expense" value="Expense">
                  Expense
                </option>
                <option key="income" value="Income">
                  Income
                </option>
                <option key="Transfer" value="Transfer">
                  Transfer
                </option>
              </Select>
            </FormControl>

            {this.state.type === "Transfer" ? (
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-transferfrom">
                    From Account
                  </InputLabel>
                  <Select
                    native
                    value={this.state.transferFrom}
                    onChange={this.onTransferFromChange}
                    input={<Input id="age-native-transferfrom" />}
                  >
                    <option value="" />{" "}
                    {this.props.accounts.map(account => {
                      return (
                        <option key={account.name} value={account.name}>
                          {account.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>

                <TextField
                  id="age-native-amount"
                  label="Amount"
                  className={classes.textField}
                  type="text"
                  placeholder="Amount"
                  value={this.state.amount}
                  onChange={this.onAmountChange}
                />

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-transferto">
                    To Account
                  </InputLabel>
                  <Select
                    native
                    value={this.state.transferTo}
                    onChange={this.onTransferToChange}
                    input={<Input id="age-native-transferto" />}
                  >
                    <option value="" />{" "}
                    {this.props.accounts.map(account => {
                      return (
                        <option key={account.name} value={account.name}>
                          {account.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>

                <Button
                  onClick={this.onTransferSubmit}
                  className={classes.button}
                  variant="raised"
                >
                  Transfer
                </Button>
                <Button
                  onClick={this.props.onClose}
                  className={classes.button}
                  variant="raised"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <div>
                <TextField
                  className={classes.textField}
                  label="Amount"
                  type="text"
                  placeholder="Amount"
                  value={this.state.amount}
                  onChange={this.onAmountChange}
                />

                <TextField
                  className={classes.textField}
                  label="Description"
                  type="text"
                  placeholder="description"
                  value={this.state.description}
                  onChange={this.onDescriptionChange}
                />

                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-account">Account</InputLabel>
                  <Select
                    native
                    value={this.state.account}
                    onChange={this.onAccountChange}
                    input={<Input id="age-native-account" />}
                  >
                    <option value="" />{" "}
                    {this.props.accounts.map(account => {
                      return (
                        <option key={account.name} value={account.name}>
                          {account.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-native-category">
                    Category
                  </InputLabel>
                  <Select
                    native
                    value={this.state.category}
                    onChange={this.onCategoryChange}
                    input={<Input id="age-native-category" />}
                  >
                    <option value="" />
                    {_.orderBy(this.props.categories, ["date"], ["asc"]).map(
                      category => {
                        return (
                          <option key={category.name} value={category.name}>
                            {category.name}
                          </option>
                        );
                      }
                    )}
                  </Select>
                </FormControl>

                <Button
                  onClick={this.onSubmit}
                  className={classes.button}
                  variant="raised"
                >
                  {/*<Save className={classes.leftIcon}/> */}
                  {this.state.submit_button_title}
                </Button>
                <Button
                  onClick={this.props.onClose}
                  className={classes.button}
                  variant="raised"
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        )}
        {this.state.error && (
          <p
            style={{
              color: "red"
            }}
          >
            {this.state.error}
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { accounts: state.accounts, categories: state.categories };
};

export default connect(mapStateToProps)(withStyles(styles)(TransactionForm));
