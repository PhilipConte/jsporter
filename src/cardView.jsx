import React from 'react';
import CardTable from './cardTable';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false, rows:[] };
    }

    render() {
        if (!this.state.isloaded) {
            return <h2>loading...</h2>
        } if (!this.props.card) {
            return <h1>select a card on the left</h1>;
        } else {
            return (<div>
                <h1>{(this.props.card)}</h1>
                <CardTable rows={this.state.rows}/>
            </div>);
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
