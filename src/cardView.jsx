import React from 'react';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false }}

    render() {
        if (!this.state.isloaded) {
            return <h2> loading...</h2>
        } else {
            // ...
            return (
                <h2>card info</h2>
    );}}

    componentDidMount() {
        this.setState({ isloaded: true });
    }
}
