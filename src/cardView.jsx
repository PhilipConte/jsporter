import React from 'react';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false }}

    render() {
        if (!this.state.isloaded) {
            return <h2>loading...</h2>
        } if (!this.props.selected) {
            return <h2>select a card on the left</h2>;
        } else {
            return (
                <h2>{(this.props.selected) ? this.props.selected:'card info'}</h2>
        );
    }
}

    componentDidMount() {
        this.setState({ isloaded: true });
    }
}
