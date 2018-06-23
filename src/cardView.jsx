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

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.rows !== prevState.rows){
            return { rows: nextProps.someValue};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.rows !== this.props.rows){
            //Perform some operation here
            this.setState({rows: this.props.rows});
        }
    }

    componentDidMount() {
        this.setState({ isloaded: true });
    }
}
