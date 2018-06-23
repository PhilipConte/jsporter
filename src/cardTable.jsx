import React from 'react';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rows:[] }
    }

    render() {
        let css = "cardTable";
        let trs = this.state.rows.map(r=> <tr key={r[0]}>
            <td className={css}>{r[0]}</td>
            <td className={css}><textarea className={css} rows="1"
                value={r[1]}
            ></textarea></td>
        </tr>);
        console.log('rows:', this.state.rows);
        return (<table className={css}><tbody>
            <tr>
                <th className={css}>Entry</th>
                <th className={css}>Content</th>
            </tr>
            {trs}
        </tbody></table>);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.rows !== prevState.rows){
            return { rows: nextProps.someValue};
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.rows !== this.props.rows){
            //Perform some operation here
            this.setState({rows: this.props.rows});
        }
    }
}
