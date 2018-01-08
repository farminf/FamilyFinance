import React from 'react';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
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
        marginBottom: theme.spacing.unit,
        
    }
});

class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.category
                ? props.category.name
                : '',
            error: '',
            submit_button_title: props.category
                ? 'Update'
                : 'Add'
        };
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.name) {
            this.setState(() => ({error: 'Please provide name and balance.'}));
        } else {
            this.setState(() => ({error: ''}));
            this
                .props
                .onSubmit({
                    name: this.state.name
                });
        }
    };

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    };

    
    render() {
        const {classes} = this.props;
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <TextField
                        className={classes.textField}
                        type="text"
                        placeholder="category"
                        autoFocus
                        value={this.state.name}
                        onChange={this.onNameChange}/>
                    
                    <Button
                        onClick={this.onSubmit}
                            className={classes.button}
                        raised
                        color="primary">{this.state.submit_button_title}</Button>
                </form>
            </div>
        )
    }

}

export default withStyles(styles)(CategoryForm);