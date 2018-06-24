import React from 'react'
import SplitPlane from 'react-split-pane';
import CardList from './cardList';
import CardView from './cardView';
import DBAPI from './dbAPI';
import autobind from 'autobind-decorator'

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
        .then("entry added. New card data:", this.state.cardData)
        .catch(err=>console.log("error adding entry:", err));
    }
    
    @autobind
    updateContent(card, entry, text) {
        this.state.db.updateContent(card, entry, text)
        .then(data => this.setState({cardData: data}))
        .then("content updated. New card data:", this.state.cardData)
        .catch(err=>console.log("error updating content:", err));
    }

    render() {
        if (!this.state.isLoaded) {
            return <h2>loading...</h2>
        }
        return (
            <SplitPlane defaultSize={220}>
                <div className="h100"><CardList
                    cards={this.state.cards}
                    handleCreate={this.createCard}
                    handleSelect={this.selectCard}
                /></div>
                <div className="h100"><CardView
                    handleCreate={this.addEntry}
                    handleType={this.updateContent}
                    card={this.state.selected}
                    rows={this.state.cardData}
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
