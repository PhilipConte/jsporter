import React from 'react';
import NameForm from './nameForm';
import LiButton from './liButton';

export default class CardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false, cards: this.props.cards };
        this.createCard = this.createCard.bind(this);
    }

    createCard(card) {
        if (this.props.handleCreate(card)) {
            this.setState({ cards: this.state.cards.concat(card) });
        }
    }

    render() {
        if (!this.state.isloaded) {
            return <h2>loading...</h2>
        } else {
            console.log('card list:',this.state.cards);
            var lis = this.state.cards.map(c => <li key={c}>{c}</li>);
            return (<div>
                <NameForm submitter={this.createCard}/>
                <h2>cards</h2>
                <ul>{lis}</ul>
                <LiButton onClick={() => alert('button pressed')} text='click me'/>
            </div>);}}

    componentDidMount() {
        this.setState({ isloaded: true });
    }
}
