import React from 'react';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import {connect} from 'react-redux';
import {startAddCategory} from '../actions/categories';
import CategotyList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';
import AddFloatingButton from '../components/AddFloatingButton';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    root: {
        marginTop: 60,
       
    }
});

class CategoriesContainer extends React.Component {

    onSubmit = (category) => {
        this
            .props
            .startAddCategory(category);
        this
            .props
            .history
            .push('/categories');
    };

    render() {
        const {classes} = this.props;
        return (
                <div className={classes.root}>
                    <h2>{Constants.ADD_CATEGORY_PAGE_TITLE}</h2>
                    <Grid container spacing={8}  justify="center">

                        <Grid item md={4} xs={12} sm={12}>
                                <CategoryForm onSubmit={this.onSubmit}/>
                        </Grid>
                        <Grid item md={6} xs={12} sm={12}>
                                <CategotyList/>
                        </Grid>

                    </Grid>
                     <AddFloatingButton/>
                </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddCategory: (category) => dispatch(startAddCategory(category))
});

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(CategoriesContainer));
