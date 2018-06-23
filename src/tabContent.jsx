import React from 'react'
import SplitPlane from 'react-split-pane';
import CardList from './cardList';
import CardView from './cardView';
import DBAPI from './dbAPI';
import autobind from 'autobind-decorator'

export default class TabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false, selected: null, cardData: [] };
    }

    @autobind
    createCard(card) {
        this.state.db.addCard(card)
        .then(cards => this.setState({cards: cards}));
    }

    @autobind
    selectCard(card) {
        this.state.db.readCard(card)
        .then(data => this.setState({selected: card, cardData: data}));
    }

    render() {
        if (!this.state.isloaded) {
            return <h2>loading...</h2>
        }
        return (
            <SplitPlane defaultSize={220}>
                <div className="h100"><CardList
                    cards={this.state.cards}
                    handleCreate={this.createCard}
                    handleSelect={this.selectCard}
                /></div>
                <div><CardView
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
            this.setState({ isloaded: true, db: db, cards: db.clist() })
        );
    }
}
