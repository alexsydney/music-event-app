import React from 'react';
import {base} from '../firebase/firebase';
import {Link} from 'react-router-dom';
import * as routes from '../constants/routes';


export default class MusicDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      response: {}
    }
    this.getQueryStringValue = this.getQueryStringValue.bind(this);
  }

  componentWillMount() {
    // let querystring = //window.location.search.substring(4);
    const id = parseInt(this.props.match.params.id);

    this.getBandDetails(id);
  }

  getQueryStringValue(key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  }

  getBandDetails(id) {

    base.fetch(`bands`, {
      context: this,
      asArray: true,
      then(data){
        const selectedBand = data.filter(band => {
          return band.id === id;
        })
        this.setState({
          response: selectedBand[0]
        })
      }
    });
  }

  render() {
    const respone = this.state.response;
    return (
      <div className="music-details">
        <div className="music-details-img" style={{backgroundImage: `url(${respone.eventImg})`}} div/>
        <div className="music-details-content">
          <h2 className="music-detail-name">{respone.name}</h2>
          <hr />
          <p className="music-detail-date">Upcoming Event Date: {respone.eventDate}</p>
          <p className="music-detail-place">Upcoming Event Location: {respone.eventPlace}</p>
          <div className="view-details-button">
            <Link to={routes.HOME}>Back</Link>
          </div>
        </div>
      </div>
    );
  }
}
