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

        this.onType = this.onType.bind(this);
    }

    onType(event) {
        event.preventDefault();
        this.props.onType(this.props.row[0], this.aRef.value);
        console.log("type event:", this.aRef.value);
    }

    @autobind
    handleClick(e) {
        if (e.type === 'click') {
            //console.log('Left click');
        } else if (e.type === 'contextmenu') {
            event.preventDefault();
            this.props.handleDelete(this.props.row[0]);
        }
    }

    render() {
        const { classes } = this.props;
        const lines = (this.props.row[1].match(/\r?\n/g) || '').length + 1;

        return (<TableRow className={classes.row}>    
            <Tooltip title='Right Click to Delete' placement='top'>
                <TableCell
                    onClick={this.handleClick} onContextMenu={this.handleClick}
                >
                        {this.props.row[0]}
                </TableCell>
            </Tooltip>
            <TableCell className={classes.multiCell}><textarea
                className={classes.textArea} rows={lines}
                value={this.props.row[1]} onChange={this.onType}
                ref={(el) => this.aRef = el}
            ></textarea></TableCell>
        </TableRow>);
    }
}

export default withStyles(styles)(EntryRow);
