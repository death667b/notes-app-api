import React, {Component} from 'react';
import {PageHeader, ListGroup} from 'react-bootstrap';
import {invokeApig} from '../libs/awsLib';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: [],
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) return;

    try {
      const results = await this.notes();
      this.setState({ notes: results });
    } catch(e) {
      alert(e);
    }
    
    this.setState({ isLoading: false });
  }

  notes = () => {
    return invokeApig({ path: '/notes' });
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