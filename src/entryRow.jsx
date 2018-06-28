import React from 'react';
import autobind from 'autobind-decorator';
import Tooltip from '@material-ui/core/Tooltip';

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
        const lines = (this.props.row[1].match(/\r?\n/g) || '').length + 1;
        return (<tr>    
            <td className={css}
                onClick={this.handleClick} onContextMenu={this.handleClick}
            >

                <Tooltip title='Right Click to Delete' placement='top'>
                    <p className='borderless'>{this.props.row[0]}</p>
                </Tooltip>
            </td>
            <td className={css}><textarea
                className={css} rows={lines}
                value={this.props.row[1]} onChange={this.onType}
                ref={(el) => this.aRef = el}
            ></textarea></td>
        </tr>);
    }
}
