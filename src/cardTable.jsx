import React from 'react';

export default class CardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { rows:[] }
    }

    render() {
        let trs = this.state.rows.map(r=>
            <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>
        )
        console.log('rows:', this.state.rows);
        return (<table><tbody>
            <tr>
                <th>Entry</th>
                <th>Content</th>
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
