import React, {Component} from 'react';
import {PageHeader, ListGroup} from 'react-bootstrap';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: [],
    };
  }

  renderNotesList = (notes) => {
    return <div><p>Notes will go here..</p></div>;
  }

  renderLander = () => {
    return (
      <div className='home'>
        <div className='lander'>
          <h1>Scratch</h1>
          <p>A simple note taking app</p>
        </div>
      </div>
    );
  }

  renderNotes = () => {
    return (
      <div className='notes'>
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  render() {
      return(
        <div className='Home'>
          {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
        </div>
      );
  }
}

export default Home;