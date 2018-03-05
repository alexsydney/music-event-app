
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCiSjG4SCjPyLS4cimpJZih-Jasb0OnSxI",
  authDomain: "music-event-app.firebaseapp.com",
  databaseURL: "https://music-event-app.firebaseio.com",
  projectId: "music-event-app",
  storageBucket: "music-event-app.appspot.com",
  messagingSenderId: "100344553688",
};

if (!firebase.apps.length) {
   firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
