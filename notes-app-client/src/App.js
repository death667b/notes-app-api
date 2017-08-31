import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
// import {CognitoUserPool} from 'amazon-cognito-identity-js';
import {authUser, signOutUser} from './libs/awsLib';
// import AWS from 'aws-sdk';
// import config from './config';
import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    }
  }

  async componentDidMount(){
    try {
      if (await authUser()) this.userHasAuthenticated(true);
    } catch(e) {
      alert(e);
    }

    this.setState({isAuthenticating: false});
    // const currentUser = this.getCurrentUser();

    // if (currentUser === null) {
    //   this.setState({isLoadingUserToken: false});
    //   return;
    // }

    // try {
    //   const userToken = await this.getUserToken(currentUser);
    //   this.updateUserToken(userToken);
    // } catch(e) {
    //   alert(e);
    // }

    // this.setState({isLoadingUserToken: false});
  }

  userHasAuthenticated = (authenticated) => {
    this.setState({isAuthenticated: authenticated});
  }

  // getCurrentUser = () => {
  //   const userPool = new CognitoUserPool({
  //     UserPoolId: config.cognito.USER_POOL_ID,
  //     ClientId: config.cognito.APP_CLIENT_ID,
  //   });

  //   return userPool.getCurrentUser();
  // }

  // getUserToken = (currentUser) => {
  //   return new Promise( (resolve, reject) => {
  //     currentUser.getSession( function(err, session) {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }

  //       resolve(session.getIdToken().getJwtToken());
  //     });
  //   });
  // }

  // updateUserToken = (userToken) => {
  //   this.setState({
  //     userToken: userToken,
  //   });
  // }

  handleLogout = (event) => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push('/login');

    // const currentUser = this.getCurrentUser();
    // if (currentUser !== null) currentUser.signOut();
    // if (AWS.config.credentials) AWS.config.credentials.clearCacheId();

    // this.updateUserToken(null);
    // this.props.history.push('/login');
  }

  // handleNavLink = (event) => {
  //   event.preventDefault();
  //   this.props.history.push(event.currentTarget.getAttribute('href'));
  // }

  render() {
    const childProps = {
      // userToken: this.state.userToken,
      // updateUserToken: this.updateUserToken,
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated, 
    }

    return (!this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Scratch</ Link>
            </ Navbar.Brand>
            <Navbar.Toggle />
          </ Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              { this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem> 
                : [ <RouteNavItem key={1} href='/signup'>Sign Up</ RouteNavItem>,
                    <RouteNavItem key={2} href='/login'>Login</ RouteNavItem> ]}
            </ Nav>
          </ Navbar.Collapse>
        </ Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
