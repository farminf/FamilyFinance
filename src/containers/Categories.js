import React from 'react';
import {withStyles} from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Constants from '../utils/constants';
import {connect} from 'react-redux';
import {startAddCategory} from '../actions/categories';
import CategotyList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    root: {
        flexGrow: 1,
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        textAlign: 'center'
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'

    },
    rootgrid: {
        justifyContent: 'center'
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
            <div>

                <div className={classes.root}>
                    <h1>{Constants.ADD_CATEGORY_PAGE_TITLE}</h1>
                    <Grid container spacing={8} className={classes.rootgrid}>

                        <Grid item md={4} xs={10} sm={5}>
                            <Paper className={classes.paper}>
                                <CategoryForm onSubmit={this.onSubmit}/>
                            </Paper>
                        </Grid>
                        <Grid item md={6} xs={10} sm={5}>
                            <Paper className={classes.paper}>
                                <CategotyList/>
                            </Paper>
                        </Grid>

                    </Grid>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddCategory: (category) => dispatch(startAddCategory(category))
});

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(CategoriesContainer));
