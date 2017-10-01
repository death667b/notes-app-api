import React, {Component} from 'react';
import {invokeApig, s3Upload} from '../libs/awsLib';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import './Notes.css';

export default class Notes extends Component {
    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            note: null,
            content: '',
            isLoading: null,
            isDeleting: null,
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

    getNote = () => invokeApig({ path: `/notes/${this.props.match.params.id}` });

    validateForm = () => this.state.content.length > 0;

    formatFilename = str => 
        str.length < 50
        ? str
        : str.substr(0, 20) + '...' + str.substr(str.length - 20, str.length);

    handleFileChange = event => this.file = event.target.files[0];

    saveNote = note => invokeApig({
        path: `/notes/${this.props.match.params.id}`,
        method: 'put',
        body: note
    })

    handleSubmit = async event => {
        let uploadFilename;
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert('Please pick a file smaller than 5MB');
            return;
        }

        this.setState({ isLoading: true });

        try {
            if (this.file) {
                uploadFilename = (await s3Upload(this.file))
                    .Location;
            }

            await this.saveNote({
                ...this.state.note,
                content: this.state.content,
                attachment: uploadFilename || this.state.note.attachment
            });
            this.props.history.push('/');
        } catch(e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            'Are you sure you want to delete this note?'
        );

        if (!confirmed) return;

        this.setState({ isDeleting: true });
    }

    render() {
        return (
            <div className='Notes'>
                {this.state.note && 
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId='content'>
                            <FormControl 
                                onChange={this.handleFileChange}
                                value={this.state.content}
                                componentClass='textarea'
                            />
                        </FormGroup>

                        {this.state.note.attachment &&
                            <FormGroup>
                                <ControlLabel>Attachment</ControlLabel>
                                <FormControl.static>
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={this.state.note.attachment}
                                    >
                                        {this.formatFilename(this.state.note.attachment)}
                                    </a>
                                </FormControl.static>
                            </ FormGroup>}

                        <FormGroup controlId='file'>
                            {!this.state.note.attachment &&
                                <ControlLabel>Attachment</ControlLabel>}
                            <FormControl onChange={this.handleFileChange} type='file' />
                        </FormGroup>

                        <LoaderButton
                            block
                            bsStyle='primary'
                            bsSize='large'
                            disabled={!this.validateForm()}
                            type='submit'
                            isLoading={this.state.isLoading}
                            text='Save'
                            loadingText='...Saving'
                        />
                        <LoaderButton
                            block
                            bsStyle='danger'
                            bsSize='large'
                            isLoading={this.state.isDeleting}
                            text='Delete'
                            loadingText='...Deleting'
                        />
                    </form>}
            </div>
        );
    }
}