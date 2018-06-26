import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 0 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class TabPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.defaultIndex };
    }

    @autobind
    handleChange(event, value) {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        
        const titles = this.props.titles.map(title =>
            <Tab key={title} label={title}/>
        );
        const tabs = this.props.tabs.map((tab, index) => (
            value === index
            &&
            <TabContainer key={this.props.titles[index]}>
                {tab}
            </TabContainer>
        ));

        return (<div>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    scrollButtons="auto"
                >
                    {titles}
                </Tabs>
            </AppBar>
            {tabs}
        </div>);
    }
}

export default withStyles(styles)(TabPanel);
