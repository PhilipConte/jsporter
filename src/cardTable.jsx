import React from 'react';
import EntryRow from './entryRow'

export default class CardView extends React.Component {
    constructor(props) { super(props); }

    render() {
        console.log('rows:', this.props.rows);
        let css = "cardTable";
        let trs = this.props.rows.map(r=> <EntryRow key={r[0]}
            row={r} className={css}
            onType={this.props.handleType}
            handleDelete={this.props.handleDelete}
        />);
        return (<table className={css}><tbody className={css}>
            <tr>
                <th className={css}>Entry</th>
                <th className={css}>Content</th>
            </tr>
            {trs}
        </tbody></table>);
    }
}
