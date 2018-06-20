import React from 'react'
import SplitPlane from 'react-split-pane';
import CardList from './cardList';
import CardView from './cardView';
import DBAPI from './dbAPI';

export default class TabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isloaded: false };

        this.createCard = this.createCard.bind(this);
    }

    createCard(cname) {
        return this.state.db.addCard(cname)
    }

    render() {
        if (!this.state.isloaded) {
            return <h2>loading...</h2>
        } else {
            // ...
            return (
                <SplitPlane defaultSize={200}>
                    <div>
                        <CardList cards={this.state.db.clist()} handleCreate={this.createCard}/>
                    </div>
                    <div>
                        <CardView />
                    </div>
                </SplitPlane>
    );}}

    componentDidMount() {
        var db = new DBAPI(this.props.path);
        db.connect()
        .then((database) => {
            this.setState({ isloaded: true, db: db })
            console.log('db connected:', database )
        });
    }
}
