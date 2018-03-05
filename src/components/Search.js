import React, { Component } from 'react';

import SearchResults from './SearchResults';

export default class Search extends Component {
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
    console.log('submmit');

    this.props.history.push(`/search/${ this.state.query }`);

  }

  handleChange( e ){
    this.setState({ query: e.target.value });
  }

   render() {

     return (
       <div>
        <p> You Search: { this.state.query }</p>
        <form onSubmit={ this.handleSubmit }>
          <input type="search" onChange={ this.handleChange } />
          <button>Search</button>
        </form>
        <br/>
       </div>
     );

   }
}
