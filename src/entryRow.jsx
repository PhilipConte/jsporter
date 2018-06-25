import React from 'react';
import autobind from 'autobind-decorator';

export default class EntryRow extends React.Component {
    constructor(props) {
        super(props);

        this.onType = this.onType.bind(this);
    }

    onType(event) {
        event.preventDefault();
        this.props.onType(this.props.row[0], this.aRef.value);
        console.log("type event:", this.aRef.value)
    }

    @autobind
    handleClick(e) {
        event.preventDefault();
        if (e.type === 'click') {
            //console.log('Left click');
        } else if (e.type === 'contextmenu') {
            console.log('Right click');
            console.log(e.target.firstChild.nodeValue);
            this.props.handleDelete(e.target.firstChild.nodeValue);
        }
    }

    render() {
        let css = this.props.className;
        return (<tr>
            <td className={css}
                onClick={this.handleClick} onContextMenu={this.handleClick}
            >
                {this.props.row[0]}
            </td>
            <td className={css}><textarea
                className={css} rows="1"
                value={this.props.row[1]} onChange={this.onType}
                ref={(el) => this.aRef = el}
            ></textarea></td>
        </tr>);
    }
}
