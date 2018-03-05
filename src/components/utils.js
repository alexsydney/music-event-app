import axios from 'axios';

const BASE_URL = "http://eventful.com/events";
const API_KEY = "jTPzp9dWrzG33Mch";


const EventfulDB = {

  getEventSearchResults( query ){
    return axios.get(`${BASE_URL}/search/event?${API_KEY}&query=${ query }`);
  },

  getEventDetails(id ){
    return axios.get(`${BASE_URL}/movie/${ id }?${API_KEY}`);
  }
};

export default EventfulDB;
