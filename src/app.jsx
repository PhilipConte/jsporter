import React from 'react';
import { remote, ipcRenderer } from 'electron';
import Store from 'electron-store';
import CenterText from './centerText';
import TabPanel from './tabPanel';
import TabContent from './tabContent';
import { getDBDialog, openDialog, createDialog } from './dialog';
import { pathToName, isKeyInStore, storePush } from './util';

const store = new Store({
    name: 'renderer-preferences',
    defaults: { 'focused': 0 }
});

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoaded: false };

        this.addFile = this.addFile.bind(this);
    }

    addFile(file) {
        storePush(store, 'files', file);
        this.setState({
            focused: this.state.files.length,
            files: store.get('files')
        });
    }

    render() {
        const { isLoaded } = this.state;
        if (!isLoaded) return <CenterText text='loading...' />;

        const { files } = this.state;
        const names = pathToName(files);
        const tabs = files.map(f =>
            <TabContent key={f} path={f} />
        );

        return (<TabPanel
            defaultIndex={this.state.focused}
            titles={names}
            tabs={tabs}
        />);
    }

    componentDidMount() {
        if (!isKeyInStore(store, 'files')) {
            const tempF = getDBDialog();
            if (tempF) {
                store.set('files', [tempF]);
            } else {
                remote.getCurrentWindow().close();
            }
        } if (store.get('focused') >= store.get('files').length) {
            store.set('focused', 0);
        } this.setState({
            isLoaded: true,
            focused: store.get('focused'),
            files: store.get('files')
        });
        
        ipcRenderer.on('file-create', () => {
            let loc = createDialog();
            if (loc) this.addFile(loc);
        }); ipcRenderer.on('file-open', () => {
            let loc = openDialog();
            if (loc) this.addFile(loc);
        });
    }
}
