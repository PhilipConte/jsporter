import React from 'react';
import autobind from 'autobind-decorator';

export default class LiButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent(event) {
    }
    @autobind
    handleClick(e) {
        event.preventDefault();
        if (e.type === 'click') {
            console.log('Left click');
            this.props.onClick();
        } else if (e.type === 'contextmenu') {
            console.log('Right click');
            this.props.onRightClick();
        }
    }

    render() {
        let css = "liButton";
        return (
            <li className={css}>
                <button className={css}
                    onClick={this.handleClick} onContextMenu={this.handleClick}
                >
                    {this.props.text}
                </button>
            </li>
        );
    }
}
