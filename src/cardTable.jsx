import React from 'react';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rows:[] }
    }

    render() {
        let trs = this.state.rows.map(r=> <tr key={r[0]}>
            <td className="cardTable">{r[0]}</td>
            <td className="cardTable">{r[1]}</td>
        </tr>)
        console.log('rows:', this.state.rows);
        return (<table className="cardTable"><tbody>
            <tr>
                <th className="cardTable">Entry</th>
                <th className="cardTable">Content</th>
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
