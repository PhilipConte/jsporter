import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '85vh',/* 
        margin: 0, */
    },
    content: {
        display: 'flex',
        width: 'auto',
        fontSize: '20px',
        margin: 0,
    },
    toolbar: theme.mixins.toolbar,
});

class CenterText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, marginL } = this.props;
        return(
            <div
                className={classes.root}
                style={{marginLeft: (''+(marginL || 0)+'px')}}
            >
                <div className={classes.toolbar} />
                <Typography className={classes.content}>
                    {this.props.text}
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(CenterText);
