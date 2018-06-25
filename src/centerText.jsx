import React from 'react';

export default class CenterText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() { return(
        <div className='centerTextParent'>
            <p className='centerTextChild'>{this.props.text}</p>
        </div>
    );}
}
