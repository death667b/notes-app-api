import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import Routes from './Routes';
import './App.css';

class App extends Component {
  handleNavLink = () => {
    alert('tt');
  }

  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Scratch</ Link>
            </ Navbar.Brand>
            <Navbar.Toggle />
          </ Navbar.Header>
          <Navbar.Collapse>
            <Nav pullright>
              <NavItem onClick={this.handleNavLink} href='/signup'>Sign Up</ NavItem>
              <NavItem onClick={this.handleNavLink} href='/login'>Login</ NavItem>
            </ Nav>
          </ Navbar.Collapse>
        </ Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
