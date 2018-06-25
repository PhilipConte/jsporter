import React from 'react';
import InputDialog from './inputDialog';
import LiButton from './liButton';

export default class CardList extends React.Component {
    constructor(props) { super(props); }
    
    render() {
        const css = "cardList";
        console.log('card list:',this.props.cards);

        var lis = this.props.cards.map(c =>
            <LiButton key={c} onClick={()=>this.props.handleSelect(c)} text={c}/>
        );
        
        return (<div className="h100">
            <h1 className={css}>Cards</h1>
            <InputDialog className={css} submitter={this.props.handleCreate}
                text={{
                    title: "Create Card", info: "Create a new card",
                    type: "Card", action: "Create" }}
            />
            <ul className={css}>{lis}</ul>
        </div>);
    }
}
