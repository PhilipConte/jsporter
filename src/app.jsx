import React from 'react';
import { remote, ipcRenderer } from 'electron';
import Store from 'electron-store';
import CenterText from './centerText';
import TabPanel from './tabPanel';
import TabContent from './tabContent';
import { getDBDialog, openDialog, createDialog, ezError } from './dialog';
import { pathToName, isKeyInStore, uniqueify } from './util';

const store = new Store({
    name: 'renderer-preferences',
    defaults: { 'focused': 0 }
});

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoaded: false };

        this.addFile = this.addFile.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(unique) {
        const { files } = this.state;
        const index = uniqueify(files, pathToName).indexOf(unique);
        const item = files[index];
        this.setState({ files: files.filter(i => i != item) });
    }

    handleFocus(nextFocus) {
        this.setState({ focused: nextFocus });
    }

    addFile(file) {
        if (this.state.files.includes(file)) {
            ezError('You already have that file open');
        } else {
            this.setState({
                focused: this.state.files.length,
                files: this.state.files.concat(file)
            });
        }
    }

    render() {
        const { isLoaded } = this.state;
        if (!isLoaded) return <CenterText text='loading...' />;

        const { files } = this.state;
        const names = uniqueify(files, pathToName);
        const tabs = files.map(f =>
            <TabContent key={f} path={f} />
        );

        return (<TabPanel
            handleClose={this.handleClose}
            handleFocus={this.handleFocus}
            value={this.state.focused}
            titles={names}
            tabs={tabs}
        />);
    }

    componentDidUpdate(prevProps, prevState) {
        const { files, focused } = this.state;
        if (files !== prevState.files) {
            store.set('files', files);
            if (focused >= files.length) {
                this.setState({ focused: (files.length - 1) })
            }
        } if (!files.length) {
            remote.getCurrentWindow().close();
        } if (focused !== prevState.focused) {
            store.set('focused', focused);
        }
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
