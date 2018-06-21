import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { remote } from 'electron';
import Store from 'electron-store';
import TabContent from './tabContent';
import { getDBDialog } from './dialog';
import {pathToName} from './util';

const store = new Store({
    name: 'renderer-preferences',
    defaults: { 'focused': 0 } });

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false } }

    render() {
        if (!this.state.isloaded) {
            return <h2>loading...</h2>
        } else {
            var files = this.state.files;
            var names = pathToName(files);
            var titles = names.map((names, index) =>
                <Tab key={index}>{names}</Tab>);
            var tabs = files.map((f, index) =>
                <TabPanel key={index}><TabContent path={f}/></TabPanel>);
            return (
                <div><Tabs defaultIndex={this.props.focused}>
                    <TabList>{titles}</TabList>
                    {tabs}
                </Tabs></div>
            );
        }
    }

    componentDidMount() {
        function isEmpty() {
            return !store.has('files') || !store.get('files').length
            || (store.get('files').length == 1 && store.get('files')[0] == null); }
        if(isEmpty()) {
            const tempf = getDBDialog();
            (tempf) ? store.set('files', [tempf]): remote.getCurrentWindow().close();
        }
        if (store.get('focused') >= store.get('files').length) store.set('focused', 0);
        this.setState({ isloaded: true, focused: store.get('focused'), files: store.get('files') });
    }
}
