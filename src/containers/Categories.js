import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Constants from "../utils/constants";
import { connect } from "react-redux";
import { startAddCategory } from "../actions/categories";
import CategotyList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import AddFloatingButton from "../components/AddFloatingButton";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  root: {
    marginTop: 60
  },
  defaultCategoryHeader: {
    fontStyle: "italic"
  },
  paper: theme.mixins.gutters({
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: theme.spacing.unit * 3,

    overflowX: "auto"
  })
});

class CategoriesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addDefaultCategoryError: ""
    };
  }

  onSubmit = category => {
    this.props.startAddCategory(category);
    this.props.history.push("/categories");
  };

  onAddDefaultCategories = () => {
    // start adding default categories

    return this.props.defaultCategories.map(category => {
      if (
        this.props.categories.find(
          savedcategory => savedcategory.name === category
        ) === undefined
      ) {
        return this.props.startAddCategory({ name: category });
      } else {
        console.log(category + ": Already exists");
        return this.setState({
          addDefaultCategoryError:
            "Some of the categories are already there, adding the rest..."
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h2>{Constants.ADD_CATEGORY_PAGE_TITLE}</h2>
        <Grid container spacing={8} justify="center">
          <Grid item md={3} xs={12} sm={12}>
            <CategoryForm onSubmit={this.onSubmit} />
          </Grid>
          <Grid item md={4} xs={12} sm={12}>
            <CategotyList />
          </Grid>
          <Grid item md={4} xs={12} sm={12}>
            <Paper className={classes.paper} elevation={4}>
              {this.state.addDefaultCategoryError && (
                <p>{this.state.addDefaultCategoryError}</p>
              )}
              <h5 className={classes.defaultCategoryHeader}>
                To start, you can add some default categories
              </h5>
              <Button
                onClick={this.onAddDefaultCategories}
                className={classes.button}
                variant="raised"
                color="default"
              >
                Add Default Categories
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <AddFloatingButton />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    defaultCategories: state.defaultReducers.categories,
    categories: state.categories
  };
};

const mapDispatchToProps = dispatch => ({
  startAddCategory: category => dispatch(startAddCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CategoriesContainer)
);
