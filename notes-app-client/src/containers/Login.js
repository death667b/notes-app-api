import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  validateForm = () => {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className='login'>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='username' bsSize='large'>
            <ControlLabel>Email</ControlLabel>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default Login;