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
    head: {
        backgroundColor: colors[500],
        color: 'white',
        position: "sticky",
        top: 0
    },
});

class CardTable extends React.Component {
    constructor(props) { super(props); }

    render() {
        if (!this.props.rows.length) {
            return <CenterText text='Create an Entry from the Toolbar above' />;
        }

        const { classes } = this.props;
        let trs = this.props.rows.map(r => <EntryRow
            key={r[0]} name={r[0]} defaultValue={r[1]}
            handleSync={this.props.handleSync}
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
            <TableBody>{trs}</TableBody>
        </Table>);
    }
}

export default withStyles(styles)(CardTable);