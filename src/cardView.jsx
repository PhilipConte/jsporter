import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import { tabHeight } from './tabPanel';
import colors from './colors';
import PlusInput from './plusInput';
import CardList from './cardList';
import CardTable from './cardTable';
import CenterText from './centerText';

const drawerWidth = 225;
export const barHeight = 64;
const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    appBar: {
        zIndex: 1,
        marginTop: tabHeight,
        width: `calc(100% - ${drawerWidth}px)`,
        height: barHeight,
        marginLeft: drawerWidth,
        backgroundColor: colors[700],
    },
    appToolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    drawerPaper: {
        zIndex: 0,
        marginTop: tabHeight,
        width: drawerWidth,
        backgroundColor: colors[500]
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: `calc(100vh - ${tabHeight + barHeight}px)`,
        //backgroundColor: theme.palette.background.default,
        marginLeft: drawerWidth,
        padding: 0,
        overflowY: "auto",
        display: "flex"
    },
    plusInput: {
        margin: 0,
        color: 'white',
    },
});

class CardView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes, card, cards, entries,
            createCard, createEntry, readCard,
            updateContent, deleteCard, deleteEntry
        } = this.props;

        return (<div>
            <AppBar position="static" className={classes.appBar}>
                {(card) ? (<Toolbar className={classes.appToolBar}>
                    <Typography variant="title" color="inherit" noWrap>
                        {card}
                    </Typography>
                    <PlusInput className={classes.plusInput}
                        submitter={entry => createEntry(card, entry)}
                        text={{
                            title: "Create Entry",
                            info: "Create a new Entry",
                            type: "Entry",
                            action: "Create"
                        }}
                    />
                </Toolbar>) : ''}
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
            >
                <CardList
                    cards={cards}
                    handleCreate={createCard}
                    handleSelect={readCard}
                    handleDelete={deleteCard}
                />
            </Drawer>
            {(card) ? (<div className={classes.content}><CardTable
                rows={entries}
                handleType={(entry, text) => updateContent(card, entry, text)}
                handleDelete={entry => deleteEntry(card, entry)}
            /></div>) : (<CenterText
                text='Select or create a card from the sidebar'
                marginL={drawerWidth}
            />)}
        </div>);
    }
}

export default withStyles(styles)(CardView);
