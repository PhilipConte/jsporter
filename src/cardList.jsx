import React from 'react';
import NameForm from './nameForm';

export default class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false, ifield: 'empty' };
        this.getName = this.getName.bind(this);
    }

    getName(cname) {
        this.setState({ifield: cname});
        this.props.handleCreate(cname);
    }

    render() {
        if (!this.state.isloaded) {
            return <h2>loading...</h2>
        } else {
            console.log('card list:',this.props.cards);
            return (<div>
                <NameForm submitter={this.getName}/>
                <h2>{this.state.ifield}</h2>
            </div>);}}

    componentDidMount() {
        this.setState({ isloaded: true });
    }
}
