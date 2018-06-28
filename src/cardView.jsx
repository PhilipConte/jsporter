import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import colors from './colors';
import PlusInput from './plusInput';
import CardList from './cardList';
import CardTable from './cardTable';
import CenterText from './centerText';

const drawerWidth = 225;
const marginTop = 48;
const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    appBar: {
        zIndex: 1,
        marginTop: marginTop,
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: colors[700],
    },
    appToolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    drawerPaper: {
        zIndex: 0,
        marginTop: marginTop,
        width: drawerWidth,
        backgroundColor: colors[500]
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100%',
        //backgroundColor: theme.palette.background.default,
        marginLeft: drawerWidth,
        padding: 0
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
                <Toolbar className={classes.appToolBar}>
                    <Typography variant="title" color="inherit" noWrap>
                        {card || ' '}
                    </Typography>
                    {(card) ? (
                        <PlusInput className={classes.plusInput}
                            submitter={entry=>createEntry(card, entry)}
                            text={ {
                                title: "Create Entry", info: "Create a new Entry",
                                type: "Entry", action: "Create"
                            } }
                        />
                    ): ''}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
            >

                <CardList
                    cards={ cards }
                    handleCreate={ createCard }
                    handleSelect={ readCard }
                    handleDelete={ deleteCard }
                />
            </Drawer>
            {(card) ? (
                <div className={classes.content}>
                    <CardTable rows={ entries }
                        handleType={(entry, text)=>updateContent(this.props.card, entry, text)}
                        handleDelete={entry=>deleteEntry(this.props.card, entry)}
                    />
                </div>
            ): (<CenterText
                    text='Select or create a card from the sidebar'
                    marginL={drawerWidth}
                />)
            }
        </div>);
    }
}

export default withStyles(styles)(CardView);
