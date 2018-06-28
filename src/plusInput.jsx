import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import autobind from 'autobind-decorator';
import IconButton from '@material-ui/core/IconButton';
import { Plus } from 'mdi-material-ui'

export default class InputDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, value:'' };
    }

    @autobind
    handleClickOpen() {
        this.setState({ open: true });
    }

    @autobind
    handleClose() {
        this.setState({ open: false, value: '' });
    }

    @autobind
    handleChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    @autobind
    handleSubmit() {
        this.props.submitter(this.state.value);
        this.handleClose();
    }

    @autobind
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSubmit();
            event.preventDefault();
        }
    }

    render() {
        const css = this.props.className;
        const { title, info, type, action } = this.props.text;

        return (<div className={css}>
            <IconButton className={css} onClick={this.handleClickOpen}>
                <Plus className={css}/>
            </IconButton>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{info}</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={type}
                        type="text"
                        fullWidth
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        {action}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
    }
}
