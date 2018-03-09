import React, { Component } from 'react';

import FindResults from './FindResults';

export default class Find extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleChange = this.handleChange.bind( this );

  }

  handleSubmit( e ){
    e.preventDefault();
    console.log('submit');

    this.props.history.push(`/find/${this.state.query }/event`);

  }

  handleChange( e ){
    this.setState({ query: e.target.value });
  }

  render() {

    return(
      <div className='wrapper'>
        <form onSubmit={ this.handleSubmit }>
          <input type="search" name="search" onChange={ this.handleChange } placeholder="find some event in this app..."/>
          <button>Find</button>
          <br/>
        </form>
      </div>
    );
  }
}
