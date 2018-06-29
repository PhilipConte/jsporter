import React from 'react'
import autobind from 'autobind-decorator';
import CenterText from './centerText';
import CardView from './cardView';
import DBAPI from './dbAPI';

export default class TabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoaded: false, selected: '', cardData: [] };
    }

    @autobind
    createCard(card) {
        this.state.db.addCard(card)
        .then(cards => this.setState({cards: cards}))
        .then(()=>this.selectCard(card));
    }

    @autobind
    selectCard(card) {
        this.state.db.readCard(card)
        .then(data => this.setState({selected: card, cardData: data}));
    }

    @autobind
    addEntry(card, entry) {
        this.state.db.addEntry(card, entry)
        .then(data => this.setState({cardData: data}));
    }
    
    @autobind
    updateContent(card, entry, text) {
        this.state.db.updateContent(card, entry, text)
        .then(data => this.setState({cardData: data}));
    }

    @autobind
    deleteEntry(card, entry) {
        this.state.db.deleteEntry(card, entry)
        .then(data => this.setState({cardData: data}));
    }

    @autobind
    deleteCard(card) {
        this.state.db.deleteCard(card)
        .then(cards=>{this.setState({selected: null, cards: cards});return cards;});
    }

    render() {
        if (!this.state.isLoaded) {
            return  <CenterText text='loading...'/>;
        }
        return (<CardView
            card={this.state.selected}
            cards={this.state.cards}
            entries={this.state.cardData}
            createCard={this.createCard}
            createEntry={this.addEntry}
            readCard={this.selectCard}
            updateContent={this.updateContent}
            deleteCard={this.deleteCard}
            deleteEntry={this.deleteEntry}
        />);
    }

    componentDidMount() {
        var db = new DBAPI(this.props.path);
        db.connect()
        .then(()=> 
            this.setState({ isLoaded: true, db: db, cards: db.cList() })
        );
    }
}
