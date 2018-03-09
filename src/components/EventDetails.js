import React, { Component } from 'react';
import Moment from 'moment';
import EventAPI from './utils';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

export default class EventDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      details: null,
    };
  }

  componentWillMount() {
    EventAPI.getEventDetails( this.props.match.params.id )
    .then( result => this.setState({ details: result.data }))
    .catch( console.error );
  }

  render(){

    if (!this.state.details ) {
      return <em>Loading...</em>;
    }


    // const hasImages = this.state.details.images && this.state.details.images.image.length

    // const img = this.state.details.images ? <img src={ this.state.details.images[0].image.thumb.url } /> : null;

    let img = null;

   if (this.state.details.images) {
     if (this.state.details.images.image.length ) {
       img = <img src={ this.state.details.images.image[0].medium.url } />
     } else {
        img = <img src={ this.state.details.images.image.medium.url } />
     }
   }

    return (
      <div className="music-event-details-container">
        <div className="music-event-details-img">
            { img }
        </div>
        <div className="music-event-details-list-item">
          <h1 className="music-event-details-title">{ this.state.details.title } </h1>
          <h2 className="music-event-details-date">{ Moment(this.state.details.start_time).format('dddd, MMMM Do YYYY hh:mm a') }  </h2>
          <h4 className="music-event-details-price">Price: ${ this.state.details.price} </h4>
          <h3 className="music-event-details-venue-name">{ this.state.details.venue_name } </h3>
          <p className="music-event-details-address"> Address: { this.state.details.address } </p>
          <h4 className="music-event-details-city">City:  { this.state.details.city }</h4>
          <h4 className="music-event-details-country">Country: { this.state.details.country }</h4>
          <p className="music-event-details-description">Description: { this.state.details.description }</p>
          <div className="music-event-details-venue-url">
          <a href={ this.state.details.url } target="_blank" >{ this.state.details.venue_name }</a>
          </div>
          <div className="view-details-button">
            <Link to={routes.HOME}>Back</Link>
          </div>
        </div>
      </div>
    );

  }

}
