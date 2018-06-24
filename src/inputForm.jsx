import React from 'react';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitter(this.state.value);
        this.setState({ value: '' });
    }

    render() {
        let css = this.props.className;
        return (
            <form className={css} onSubmit={this.handleSubmit}>
                <label className={css}>
                    {this.props.text}
                    <input type="text" size="10" className={css}
                        value={this.state.value} onChange={this.handleChange}
                    />
                </label>
                <input className={css} type="submit" defaultValue="Submit" />
            </form>
        );
    }
}
