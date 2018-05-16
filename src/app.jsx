import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SplitPlane from 'react-split-pane';

export default class App extends React.Component {
    render() {
        return (<div>
            <Tabs>
                <TabList>
                    <Tab>Title 1</Tab>
                    <Tab>Title 2</Tab>
                </TabList>

                <TabPanel>
                    <SplitPlane defaultSize={200}>
                        <div>
                            <h2>Hello World!</h2>
                        </div>
                        <div>
                            <h2>Welcome to React!</h2>
                        </div>
                    </SplitPlane>
                </TabPanel>
                <TabPanel>
                    <h2>just here for show</h2>
                </TabPanel>
            </Tabs>
        </div>);
    }
}
