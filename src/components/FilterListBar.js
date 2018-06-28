import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

// import moment from 'moment'; import {SingleDatePicker} from 'react-dates';

export const styles = theme => ({
  root: {
    //position: "relative"
    display: "inline-block",
    width: "100%"
  },
  divLeft: {
    //textAlign: "left", marginLeft: 0,
    float: "left"
  },
  divRight: {
    //textAlign: "right", marginRight: 0
    float: "right",
    padding: 10
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 150,
    padding: 10
  },

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 100,
    padding: 10
  },
  dateFormControl: {
    margin: theme.spacing.unit,
    marginTop: 10,
    minWidth: 200,
    padding: 10
  }
});

export class FilterListBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeFilter: props.filters.typeFilter ? props.filters.typeFilter : "",
      descriptionFilter: props.filters.descriptionFilter
        ? props.filters.descriptionFilter
        : "",
      accountFilter: props.filters.accountFilter
        ? props.filters.accountFilter
        : "",
      categoryFilter: props.filters.categoryFilter
        ? props.filters.categoryFilter
        : ""
    };
  }

  onTypeFilerChange = e => {
    const typeFilter = e.target.value;
    this.setState(
      {
        typeFilter
      },
      () => {
        this.props.onFilter(this.state);
      }
    );
  };

  onDescriptionFilter = e => {
    const descriptionFilter = e.target.value;
    this.setState(
      {
        descriptionFilter
      },
      () => {
        this.props.onFilter(this.state);
      }
    );
  };

  onAccountFilter = e => {
    const accountFilter = e.target.value;
    this.setState(
      {
        accountFilter
      },
      () => {
        this.props.onFilter(this.state);
      }
    );
  };

  onCategoryFilter = e => {
    const categoryFilter = e.target.value;
    this.setState(
      {
        categoryFilter
      },
      () => {
        this.props.onFilter(this.state);
      }
    );
  };

  onFilter = () => {
    this.props.onFilter(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.divLeft}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="type-native-simple">Type</InputLabel>
            <Select
              native
              value={this.state.typeFilter}
              onChange={this.onTypeFilerChange}
              input={<Input id="type-native-simple" />}
            >
              <option key="all" value="" />
              <option key="expense" value="Expense">
                Expense
              </option>
              <option key="income" value="Income">
                Income
              </option>
              <option key="transfer" value="Transfer">
                Transfer
              </option>
            </Select>
          </FormControl>
          <TextField
            className={classes.textField}
            type="text"
            label="Description"
            value={this.state.descriptionFilter}
            onChange={this.onDescriptionFilter}
          />

          <TextField
            className={classes.textField}
            type="text"
            label="Account"
            value={this.state.accountFilter}
            onChange={this.onAccountFilter}
          />

          <TextField
            className={classes.textField}
            type="text"
            label="Category"
            value={this.state.categoryFilter}
            onChange={this.onCategoryFilter}
          />

          {/*<Button onClick={this.onFilter} className={classes.button} raised>
                            Filter
                        </Button>*/}
        </div>
        <div className={classes.divRight}>{this.props.exportComponent}</div>
      </div>
    );
  }
}

export default withStyles(styles)(FilterListBar);
