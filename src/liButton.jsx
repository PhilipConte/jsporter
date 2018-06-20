import React from 'react';

export default class LiButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent(event) {
        event.preventDefault();
        this.props.onClick();
    }

    render() {
        return (
            <button onClick={this.clickEvent} className="clear-button">
            {this.props.text}</button>
        );
    }
}