import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {HelpBlock, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import './Signup.css';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            username: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
            newUser: null,
        };
    }

    validateForm = () => {
        return this.state.username.length > 0 
            && this.state.password.length > 0
            && this.state.password === this.state.confirmPassword;
    }

    validateConfirmationForm = () => {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({isLoading: true});
        this.setState({newUser: 'test'});
        this.setState({isLoading: false});
    }

    handleConfirmationSubmit = async (event) => {
        event.preventDefault();

        this.setState({isLoading: true});
    }

    
}

export default withRouter(Signup);