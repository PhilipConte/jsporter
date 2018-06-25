import React from 'react'
import SplitPlane from 'react-split-pane';
import autobind from 'autobind-decorator';
import CardList from './cardList';
import CardView from './cardView';
import DBAPI from './dbAPI';

export default class TabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLoaded: false, selected: null, cardData: [] };
    }

    @autobind
    createCard(card) {
        this.state.db.addCard(card)
        .then(cards => this.setState({cards: cards}))
        .then(()=>this.selectCard(card))
        .catch(err=>console.log("error adding card:", err));
    }

    @autobind
    selectCard(card) {
        this.state.db.readCard(card)
        .then(data => this.setState({selected: card, cardData: data}));
    }

    @autobind
    addEntry(card, entry) {
        this.state.db.addEntry(card, entry)
        .then(data => this.setState({cardData: data}))
        .catch(err=>console.log("error adding entry:", err));
    }
    
    @autobind
    updateContent(card, entry, text) {
        this.state.db.updateContent(card, entry, text)
        .then(data => this.setState({cardData: data}))
        .catch(err=>console.log("error updating content:", err));
    }

    @autobind
    deleteEntry(card, entry) {
        this.state.db.deleteEntry(card, entry)
        .then(data => this.setState({cardData: data}))
        .catch(err=>console.log("error deleting entry:", err));
    }

    @autobind
    deleteCard(card) {
        this.state.db.deleteCard(card)
        .then(cards=>{this.setState({selected: null, cards: cards});return cards;})
        .catch(err=>console.log("error deleting card:", err));
    }

    render() {
        if (!this.state.isLoaded) {
            return <h2>loading...</h2>
        }
        return (
            <SplitPlane defaultSize={150}>
                <div className="h100"><CardList
                    cards={this.state.cards}
                    handleCreate={this.createCard}
                    handleSelect={this.selectCard}
                    handleDelete={this.deleteCard}
                /></div>
                <div className="h100"><CardView
                    card={this.state.selected}
                    rows={this.state.cardData}
                    handleCreate={this.addEntry}
                    handleType={this.updateContent}
                    handleDelete={this.deleteEntry}
                /></div>
            </SplitPlane>
        );
    }

    componentDidMount() {
        var db = new DBAPI(this.props.path);
        db.connect()
        .then(()=> 
            this.setState({ isLoaded: true, db: db, cards: db.cList() })
        );
    }
}
