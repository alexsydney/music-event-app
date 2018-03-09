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

    this.props.history.push(`/search/${ this.state.query }/music`);

  }

  handleChange( e ){
    this.setState({ query: e.target.value });
  }

   render() {

     return (
       <div className='music-search-eventful-container'>
        <form onSubmit={ this.handleSubmit }>
          <input type="search" name="search" onChange={ this.handleChange } placeholder="Enter city to search for event." className="music-search-eventful-input"/>
          <button className="music-search-eventful-button">Search</button>
        </form>
        <br/>
       </div>
     );

   }
}
