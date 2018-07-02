import React from 'react';
import autobind from 'autobind-decorator';
import { withStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    row: {
        hover: true,
    },
    multiCell: {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        padding: 'none',
        borderLeft: '1px solid #ddd',
    },
    textArea: {
        width: '100%',
        resize: 'none',
        border: 0,
        padding: 8,
        boxSizing: 'border-box',
    }
});

class EntryRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.defaultValue};

        this.onType = this.onType.bind(this);
        this.onUpdated = this.onUpdated.bind(this);
    }

    onType(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
        console.log("onType:", this.state.value);
    }

    onUpdated(event) {
        event.preventDefault();
        this.props.handleSync(this.props.name, this.state.value);
        console.log("onUpdate:", this.state.value);
    }

    @autobind
    handleClick(e) {
        if (e.type === 'click') {
            //console.log('Left click');
        } else if (e.type === 'contextmenu') {
            event.preventDefault();
            this.props.handleDelete(this.props.name);
        }
    }

    render() {
        const { classes } = this.props;
        const lines = (this.state.value.match(/\r?\n/g) || '').length + 1;

        return (<TableRow className={classes.row}>    
            <Tooltip title='Right Click to Delete' placement='top'>
                <TableCell
                    onClick={this.handleClick} onContextMenu={this.handleClick}
                >
                        {this.props.name}
                </TableCell>
            </Tooltip>
            <TableCell className={classes.multiCell}><textarea
                className={classes.textArea} rows={lines}
                value={this.state.value} onChange={this.onType}
                onKeyUp={this.onUpdated}
            ></textarea></TableCell>
        </TableRow>);
    }
}

export default withStyles(styles)(EntryRow);
