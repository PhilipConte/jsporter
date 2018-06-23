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
        let css = "liButton";
        return (
            <li className={css}>
                <button
                    onClick={this.clickEvent} className={css}
                >
                    {this.props.text}
                </button>
            </li>
        );
    }
}
