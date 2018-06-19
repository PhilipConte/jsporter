import React from 'react'
import SplitPlane from 'react-split-pane';
import CardList from './cardList';
import CardView from './cardView';
import DBAPI from './dbAPI';

export default class TabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false }}

    createCard(cname) {
        //this.setState({ db: this.state.db.addCard(cname) });
        this.state.db.addCard(cname)
    }

    render() {
        if (!this.state.isloaded) {
            return <h2>loading...</h2>
        } else {
            // ...
            return (
                <SplitPlane defaultSize={200}>
                    <div>
                        <CardList cards={this.state.db.cards} handleCreate={this.createCard}/>
                    </div>
                    <div>
                        <CardView />
                    </div>
                </SplitPlane>
    );}}

    componentDidMount() {
        this.setState({ isloaded: true, db:(new DBAPI(this.props.path)) });
    }
}