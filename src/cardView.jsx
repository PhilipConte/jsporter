import React from 'react';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false, rows:[] }}

    render() {
        if (!this.state.isloaded) {
            return <h2>loading...</h2>
        } if (!this.props.card) {
            return <h2>select a card on the left</h2>;
        } else {
            console.log('rows:', this.state.rows);
            return (
                <h2>{(this.props.card)}</h2>
        );
    }
}
    componentWillReceiveProps(nextProps) {
        this.setState({rows: nextProps.rows, card: nextProps.card})
    }

    componentDidMount() {
        this.setState({ isloaded: true });
    }
}
