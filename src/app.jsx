import React from 'react';
import { remote } from 'electron';
import Store from 'electron-store';
import TabPanel from './tabPanel';
import TabContent from './tabContent';
import { getDBDialog } from './dialog';
import {pathToName} from './util';

const store = new Store({
    name: 'renderer-preferences',
    defaults: { 'focused': 0 } });

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoaded: false };
    }

    render() {
        if (!this.state.isLoaded) {
            return <h2>loading...</h2>
        }
        
        const { files } = this.state;
        const names = pathToName(files);
        const tabs = files.map(f =>
            <TabContent path={f}/>
        );

        return (
            <TabPanel
                defaultIndex={this.state.focused}
                titles={names}
                tabs={tabs}
            />
        );
    }

    componentDidMount() {
        function isEmpty() {
            return (
                !store.has('files')
                || !store.get('files').length
                || (
                    store.get('files').length == 1
                    && store.get('files')[0] == null
                )
            );
        }
        if(isEmpty()) {
            const tempF = getDBDialog();
            (tempF) ? store.set('files', [tempF]): remote.getCurrentWindow().close();
        }
        if (store.get('focused') >= store.get('files').length) store.set('focused', 0);
        this.setState({ isLoaded: true, focused: store.get('focused'), files: store.get('files') });
    }
}
