
import * as firebase from 'firebase';
import Rebase from 're-base';

const config = {
  apiKey: "AIzaSyCiSjG4SCjPyLS4cimpJZih-Jasb0OnSxI",
  authDomain: "music-event-app.firebaseapp.com",
  databaseURL: "https://music-event-app.firebaseio.com",
  projectId: "music-event-app",
  storageBucket: "music-event-app.appspot.com",
  messagingSenderId: "100344553688",
};

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(config);

  var base = Rebase.createClass(app.database());
}

const auth = firebase.auth();

export {
  auth,
  base,
};
