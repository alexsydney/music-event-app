import React, { Component } from 'react';

import EventAPI from './utils';

const Result = function(props){

  console.log(props.data);

  const eventURL = "http://sydney.eventful.com/events" + props.data.url;

  const img = props.data.image ? <img src={props.data.image.medium.url} /> : null;


  return (
    <div className="event-thumbnail" onClick={ () => props.onclick( props.data.id )} >
      { img  }
      <p>  {props.data.title } </p>
    </div>
  );

};

// http://api.eventful.com/rest/events/search?...&date=ThisWeek&location=rennes&image_sizes=block100,large,dropshadow250


export default class SearchResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      totalItems: 0,
      pageSize: 0,
    };

    this.goToShowEvent = this.goToShowEvent.bind( this );
  }

  goToShowEvent( id ) {
    console.log('go to show event id:', id);
    this.props.history.push(`/event/${ id }`);
  }

  getResults() {
    EventAPI.getEventSearchResults( this.props.match.params.location, this.props.match.params.category )
    .then( events => this.setState({
        events: events.data.events.event,
        totalItems: events.data.total_items,
        pageSize: events.data.page_size
    }))
    .catch( error => console.error('API Eventful error') );
  }

  componentDidUpdate( preProps, preState ){
    console.log('componentDidMount()');
    // INFINITE LOOP GOTCHA! If we run code in componentDidUpdate() which causes a setState(),
   // we will get stuck in an infinite loop of setState() -> componentDidUpdate() -> setState()
   // ...so we need to make sure not to keep setting state if nothing important has changed
    if ( preProps.match.url === this.props.match.url ) {
      return;
    }

    this.setState({ events: [] }); // clear the old events, causing "Loading.. " to display
    this.getResults();
  }

  // componentWillMount(){
  //   EventAPI.getEventSearchResults( this.props.match.params.location, this.props.match.params.category )
  //   .then( results => this.setState({ results: results.data }));
  // }

  componentWillMount() {
    console.log('SearchResults');
    this.getResults();
  }

  render(){

    // Handle the case where there are no search results yet
    // (because we have no yet received a response to our AJAX request)
    if( this.state.events.length === 0) {
      return <em>Loading...</em>;
    }

    const resultEvent = this.state.events.map( event => (
      <Result
        key={ event.id }
        data={ event }
        onclick={ this.goToShowEvent }
      />
    ));

    return (
      <div classname="music-search-results-container">
      <h3>There are { this.state.totalItems }  events {this.props.match.params.category } in { this.props.match.params.location}</h3>
       <hr className="music-search-results-horizontal-line"/>
       <div className="music-search-results-event">
            { resultEvent }
       </div>
      </div>
    );
  }
}
