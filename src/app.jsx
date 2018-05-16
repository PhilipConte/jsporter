import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class App extends React.Component {
  render() {
    return (<div>
      <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Welcome to React!</h2>
        </TabPanel>
        <TabPanel>
          <h2>Hello World!</h2>
        </TabPanel>
      </Tabs>
    </div>);
  }
}
