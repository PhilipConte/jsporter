import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import autobind from 'autobind-decorator';

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
        this.setState({ open: false });
    }

    @autobind
    handleChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    @autobind
    handleSubmit() {
        this.handleClose();
        this.props.submitter(this.state.value);
        this.setState({ value: '' });
    }

    render() {
        const css = this.props.className;
        const { title, info, type, action } = this.props.text;

        return (<div className={css}>
            <Button className={css} onClick={this.handleClickOpen}>{title}</Button>
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
