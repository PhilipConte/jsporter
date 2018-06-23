import React from 'react';

export default class InputForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitter(this.formRef.childNodes[0].childNodes[3].value);
        this.formRef.reset();
    }

    render() {
        let css = this.props.className;
        return (
            <form className={css}
                onSubmit={this.handleSubmit} ref={(el) => this.formRef = el}
            >
                <label className={css}>
                    {this.props.text}
                    <input type="text" size="10" className={css}
                        defaultValue=""
                    />
                </label>
                <input className={css} type="submit" defaultValue="Submit" />
            </form>
        );
    }
}
