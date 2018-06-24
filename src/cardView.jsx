import React from 'react';
import CardTable from './cardTable';
import InputForm from './inputForm';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let css = "cardView"
        if (!this.props.card) {
            return <h1 className={css}>Select a card on the left</h1>;
        }
        return (<div className="h100">
            <h1 className={css}>{(this.props.card)}</h1>
            <InputForm text="Entry:" className={css}
                submitter={entry=>this.props.handleCreate(this.props.card, entry)}
            />
            <CardTable rows={this.props.rows}
                handleType={(entry, text)=>this.props.handleType(this.props.card, entry, text)}
            />
        </div>);
    }
}
