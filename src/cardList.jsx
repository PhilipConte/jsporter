import React from 'react';
import NameForm from './nameForm';
import LiButton from './liButton';

export default class CardList extends React.Component {
    constructor(props) { super(props); }
    
    render() {
        console.log('card list:',this.props.cards);
        var lis = this.props.cards.map(c =>
            <LiButton key={c} onClick={()=>this.props.handleSelect(c)} text={c}/>
        );
        return (<div>
            <NameForm submitter={this.props.handleCreate}/>
            <h2>cards</h2>
            <ul>{lis}</ul>
        </div>);
    }
}
