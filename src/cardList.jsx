import React from 'react';
import autobind from 'autobind-decorator';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import { tabHeight } from './tabPanel';
import { barHeight } from './cardView';
import colors from './colors';
import PlusInput from './plusInput';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
    },
    appBar: {
        height: barHeight,
        backgroundColor: colors[700],
    },
    appToolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    toolbar: theme.mixins.toolbar,
    plusInput: {
        margin: 0,
        color: 'white',
    },
    list: {
        flexGrow: 1,
        flexDirection: 'column',
        //height: '100px',
        height: `calc(100vh - ${tabHeight + barHeight}px)`,
        overflow: "auto",
        display: "flex",
    },
    listItem: {
        flexShrink: 0,
    },
    listItemButton: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    listText: {
        color: 'white',
        fontSize: '20px',
    }
});

class CardList extends React.Component {
    constructor(props) { super(props); }
    
    @autobind
    handleClick(e, c) {
        event.preventDefault();
        if (e.type === 'click') {
            this.props.handleSelect(c);
        } else if (e.type === 'contextmenu') {
            this.props.handleDelete(c);
        }
    }

    render() {
        console.log('heights', tabHeight+barHeight)
        const { classes } = this.props;
        console.log('card list:',this.props.cards);

        var lis = this.props.cards.map(c =>
            <Tooltip key={c} title='Right Click to Delete' placement='top-start'>
                <ListItem 
                    button
                    className={classes.listItem}
                    classes={{ button: classes.listItemButton }}
                    onClick={e=>this.handleClick(e, c)}
                    onContextMenu={e=>this.handleClick(e, c)}
                >
                    <ListItemText
                        classes={{ primary: classes.listText }}
                        primary={c}
                    />
                </ListItem>
            </Tooltip>
        );
        
        return (<div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.appToolBar}>
                    <Typography variant="title" color="inherit" noWrap>
                        Cards
                    </Typography>
                    <PlusInput className={classes.plusInput}
                        submitter={this.props.handleCreate}
                        text={ {
                            title: "Create Card", info: "Create a new Card",
                            type: "Card", action: "Create"
                        } }
                    />
                </Toolbar>
            </AppBar>
            <List className={classes.list}>{lis}</List>
        </div>);
    }
}

export default withStyles(styles)(CardList);
