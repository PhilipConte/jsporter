import React from 'react';
import CardTable from './cardTable';
import InputDialog from './inputDialog';
import CenterText from './centerText';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const css = "cardView"
        if (!this.props.card) {
            return <CenterText text='Select or create a card from the sidebar'/>;
        }
        return (<div className='h100'>
            <h1 className={css}>{(this.props.card)}</h1>
            <div id="buttonBar">
            <InputDialog className={css}
                submitter={entry=>this.props.handleCreate(this.props.card, entry)}
                text={{
                    title: "Add Entry", info: "Create a new Entry",
                    type: "Entry", action: "Add" }}
            />
            </div>
            <CardTable rows={this.props.rows}
                handleType={(entry, text)=>this.props.handleType(this.props.card, entry, text)}
                handleDelete={entry=>this.props.handleDelete(this.props.card, entry)}
            />
        </div>);
    }
}
