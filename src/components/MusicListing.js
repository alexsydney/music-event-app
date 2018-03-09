import React from 'react';

import {base} from '../firebase/firebase';

import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

// import * as Datetime from 'react-datetime';

const INITIAL_FORM_STATE = {
  addBandName: '',
  addDate: '',
  addPlace: '',
  addImage: '',
  updateBandName: '',
  updateDate: '',
  updatePlace: '',
  updateImage: '',
}

export default class MusicListing extends React.Component {
  constructor() {
    super();
    this.state = {
      listOfBands: [],
      addBandName: '',
      addDate: '',
      addPlace: '',
      addImage: '',
      updateBandName: '',
      updateDate: '',
      updatePlace: '',
      updateImage: '',
      updateFormOpen: false,
      showUpdateForm: false,
      createFormOpen: false,
      showCreateForm: false,
    }

    this.getListOfBands();
    this.getListOfBands = this.getListOfBands.bind(this);
    this.renderBandItem = this.renderBandItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addBand = this.addBand.bind(this);
    this.deleteBand = this.deleteBand.bind(this);
    this.updateBand = this.updateBand.bind(this);
    this.toggleUpdateBandForm = this.toggleUpdateBandForm.bind(this);
    this.toggleCreateBandForm = this.toggleCreateBandForm.bind(this);
  }

  componentDidMount() {
    base.syncState(`bands`, {
      context: this,
      state: 'listOfBands',
      asArray: true
    });
  }

  addBand(e){
    e.preventDefault();
    const id = new Date().getTime();
    const bandName = this.state.addBandName;
    const addDate = this.state.addDate;
    const place = this.state.addPlace;
    const img = this.state.addImage;

    base.post(`bands/${id}`, {
      data: {id, name: bandName, eventDate: addDate, eventPlace: place, eventImg: img},
      then(err){
        if(!err){
          console.log('posted!');
          // Router.transitionTo('dashboard');
        }
      }
    });

    this.setState({
      createFormOpen: false,
      showCreateForm: false,
      ...INITIAL_FORM_STATE
    });
  }

  getListOfBands() {
    base.fetch('bands', {
      context: this,
      asArray: true,
      then(data){
        this.setState({
          listOfBands: data
        });
      }
    });
  }

  updateBand(e){
    e.preventDefault();
    const id = this.state.updateId
    const bandName = this.state.updateBandName;
    const updateDate = this.state.updateDate;
    const place = this.state.updatePlace;
    const img = this.state.updateImage;
    base.update(`bands/${id}`, {
      data: {name: bandName, eventDate: updateDate, eventPlace: place, eventImg: img}
    }).then(() => {
      this.setState({
        updateFormOpen: false,
        showUpdateForm: false,
        ...INITIAL_FORM_STATE,
      })
    }).catch(err => {
      //handle error
    });
  }


  deleteBand(id){
    console.log('this ran', id);
    base.remove(`bands/${id}`).then(() => {
      // Router.transitionTo('dashboard');
    }).catch(error => {
      //handle error
    });
  }

  // deleteBand(bandId) {
  //   const bandRef = base().ref(`bands/${bandId}`);
  //   bandRef.remove();
  // }
  toggleCreateBandForm(e) {
    if (this.state.createFormOpen) {
      this.setState({showCreateForm: false, createFormOpen: false});
      console.log('form is open');
    } else {
      this.setState({showCreateForm: true, createFormOpen: true});
      console.log('form is closed');
    }
  }

  toggleUpdateBandForm(e, id) {
    if (this.state.updateFormOpen) {
      this.setState({showUpdateForm: false, updateFormOpen: false, updateId: id});
      console.log('form is open');
    } else {
      this.setState({showUpdateForm: true, updateFormOpen: true, updateId: id});
      console.log('form is closed');
    }
  }

  renderBandItem(item) {
    return(
      <li key={item.key} className="music-list-item">
        <div className="music-listing-img" style={{backgroundImage: `url(${item.eventImg})`}} div/>
        <div className="music-list-item-content" >
          <h2 className="music-listing-title">{ item.name }</h2>
          <div className="view-details-button">
            <Link to={`/band/${item.id}`}>View Details</Link>

          </div>

          {/*
            <p>{ item.eventDate }</p>
            <p>{ item.eventPlace }</p>
          */}

          <div className="music-list-item-cta">
            <button className="button-one-style" onClick={(e) => {this.toggleUpdateBandForm(e, item.key)}}>Edit</button>
            <button className="button-two-style" onClick={() => this.deleteBand(item.key) }>Delete</button>
          </div>
        </div>
      </li>
    )
  }

  handleInputChange(e) {
    console.log('event', e);
    const whichInput = e.target.id;

    this.setState({
      [whichInput]: e.target.value,
    })
    // this.setState({ [e.target.name]: e.target.value });

  }


  render() {
    return (
      <div className='music-listing-component'>
        <button className="add-band-button" onClick={this.toggleCreateBandForm}>+</button>
        <ul>
          {this.state.listOfBands.length !== 0 ? (
            this.state.listOfBands.map(item => {
              return (
                this.renderBandItem(item)
              );
            })
          ) : <div>Loading</div>}
        </ul>
      {/*  <button onClick={this.addBand}>Add new band</button> */}
          {this.state.showCreateForm &&
            <div className='add-item'>
            <form onSubmit={this.addBand}>
              <label>Enter band/artist name: </label>
              <input id="addBandName" onChange={this.handleInputChange} value={this.state.addBandName} type="addBandName" placeholer="enter band/artist name..."/> <br/>
              <label>Date performance:</label>
              <input id="addDate" onChange={this.handleInputChange} value={this.state.addDate} type="addDate" placeholer="date of event..."/> <br/>
              <label>Place:</label>
              <input id="addPlace" onChange={this.handleInputChange} value={this.state.addPlace} type="addPlace" placeholer="place of event"/> <br/>
              <label>Photo:</label>
              <input id="addImage" onChange={this.handleInputChange} value={this.state.addImage} type="addImage" placeholer="url photo of event"/> <br/>
              <button>Create</button>
            </form>
            </div>

          }

        {this.state.showUpdateForm &&
          <form className="update-band-form" onSubmit={this.updateBand}>
            <h2>Update Artist/Band Details</h2>
            <label>Enter band/artist name: </label>
            <input id="updateBandName" onChange={this.handleInputChange} value={ this.state.updateBandName} type="updateBandName" placeholer="enter band/artist name..."/> <br/>
            <label>Date performance:</label>
            <input id="updateDate" onChange={this.handleInputChange} value={this.state.updateDate} type="updateDate" placeholer="date of event..."/> <br/>
            <label>Place:</label>
            <input id="updatePlace" onChange={this.handleInputChange} value={this.state.updatePlace} type="updatePlace" placeholer="place of event"/> <br/>
            <label>Photo:</label>
            <input id="updateImage" onChange={this.handleInputChange} value={this.state.updateImage} type="updateImage" placeholer="url photo of event"/> <br/>
            <button>Update</button>
          </form>
        }
      </div>

    );
  };
}
