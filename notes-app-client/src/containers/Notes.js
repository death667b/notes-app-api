import React, {component} from 'react';
import {invokeApig} from '../libs/awsLib';

export default class Notes extends component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            note: null,
            content: '',
        }
    }

    async componentDidMount() {
        try {
            const results = await this.getNote();
            this.setState({
                note: results,
                content: results.content,
            });
        } catch(e) {
            alert(e);
        }
    }

    getNote() {
        return invokeApig({ path: `/notes/${this.props.match.params.id}` });
    }

    render() {
        return <div className='notes' />;
    }
}