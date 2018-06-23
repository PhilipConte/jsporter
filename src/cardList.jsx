import React from 'react';
import NameForm from './nameForm';
import LiButton from './liButton';

export default class CardList extends React.Component {
    constructor(props) { super(props); }
    
    render() {
        let css = "cardList";
        console.log('card list:',this.props.cards);
        var lis = this.props.cards.map(c =>
            <LiButton key={c} onClick={()=>this.props.handleSelect(c)} text={c}/>
        );
        return (<div className="h100">
            <h1 className={css}>Cards</h1>
            <NameForm className={css} submitter={this.props.handleCreate}/>
            <ul className={css}>{lis}</ul>
        </div>);
    }
}
