import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import colors from './colors';
import EntryRow from './entryRow'
import CenterText from './centerText';

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: 0,
        overflowX: "auto",
        overflowY: "auto",
    },
    head: {
        backgroundColor: colors[500],
        color: 'white',
        position: "sticky",
        top: 0
    },
    body: {
        marginTop: 0,
        overflowY: "auto",
    }
});

class CardTable extends React.Component {
    constructor(props) { super(props); }

    render() {
        if (!this.props.rows.length) {
            return <CenterText text='Create an Entry from the Toolbar above' />;
        }

        const { classes } = this.props;
        console.log('rows:', this.props.rows);
        let trs = this.props.rows.map(r => <EntryRow
            key={r[0]} row={r}
            onType={this.props.handleType}
            handleDelete={this.props.handleDelete}
        />);

        return (<Table>
            <TableHead><TableRow>
                <TableCell className={classes.head}>
                    Entry
                </TableCell>
                <TableCell className={classes.head}>
                    Content
                </TableCell>
            </TableRow></TableHead>
            <TableBody className={classes.body}>{trs}</TableBody>
        </Table>);
    }
}

export default withStyles(styles)(CardTable);