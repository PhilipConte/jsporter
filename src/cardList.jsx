import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import colors from './colors';
import PlusInput from './plusInput';
import LiButton from './liButton';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
    },
    appBar: {
        marginBottom: 4,
        backgroundColor: colors[700],
    },
    appToolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: 0
    },
    plusInput: {
        margin: 0,
        color: 'white',
    },
    ul: {
        listStyleType: 'none',
        margin: 0,
        padding: '0px 2px',
    },
    li: {
        padding: 2
    },
    liButton: {
        color: 'white',
        fontSize: '18px',
        background: 'Transparent no-repeat',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
        boxShadow: 'none',
    }
});

class CardList extends React.Component {
    constructor(props) { super(props); }
    
    render() {
        const { classes } = this.props;
        const css = "cardList";
        console.log('card list:',this.props.cards);

        var lis = this.props.cards.map(c =>
            <li key={c} className={classes.li}><LiButton
                className={classes.liButton} text={c}
                onClick={()=>this.props.handleSelect(c)}
                onRightClick={()=>this.props.handleDelete(c)}
            /></li>
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
            <ul className={classes.ul}>{lis}</ul>
        </div>);
    }
}

export default withStyles(styles)(CardList);
