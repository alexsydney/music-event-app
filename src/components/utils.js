import axios from 'axios';

const BASE_URL = "https://us-central1-music-event-app.cloudfunctions.net/events?";



const EventfulDB = {

  getEventSearchResults( location, category ){
    return axios.get(`${BASE_URL}&action=search&location=${ location }&category=${ category }&date=Future`);
  },

  getEventDetails( id ){
    return axios.get(`${BASE_URL}action=details&id=${ id }`);
  }

};

export default EventfulDB;
