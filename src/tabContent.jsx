import React from 'react'
import SplitPlane from 'react-split-pane';

export default class dbTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false }}

    render() {
        if (!this.state.isloaded) {
            return <h2> loading...</h2>
        } else {
            // ...
            return (
                <SplitPlane defaultSize={200}>
                    <div>
                        <h2>Hello World!</h2>
                    </div>
                    <div>
                        <h2>Welcome to React!</h2>
                    </div>
                </SplitPlane>
    );}}

    componentDidMount() {
        this.setState({ isloaded: true });
    }
}