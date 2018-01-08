import React from 'react';
import {connect} from 'react-redux';
import CategoryListItem from './CategoryListItem';
import {startDeleteCategory, startAddCategory} from '../actions/categories';
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

export class CategoryList extends React.Component {

    onDelete = (id) => {
        this
            .props
            .startDeleteCategory(id);
    };

    onCopy = (id) => {
        console.log(id)
        this
            .props
            .categories
            .map((category) => {
                if (category.id === id) {
                    return this
                        .props
                        .startAddCategory(category);
                } else {
                    return console.log('no category with this ID found')
                }
            })

    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.props.categories.lenght === 0
                    ? (
                        <p>no categories</p>
                    )
                    : (
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell ></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { this
                                    .props
                                    .categories
                                    .map((category) => {
                                        return <CategoryListItem 
                                            key={category.id} 
                                            onDelete={this.onDelete}
                                            onCopy={this.onCopy}
                                            {...category}/>
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
        categories: state.categories,
        ...props
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startAddCategory: (category) => dispatch(startAddCategory(category)),
    startDeleteCategory: (data) => dispatch(startDeleteCategory(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CategoryList))