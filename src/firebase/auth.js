
// import * as firebase from 'firebase';
import { auth } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
 auth.signOut();

// Password Reset
 export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email) ;

// Password Change
export const doPasswordUpdate =(password)  =>
 auth.currentUser.updatePassword(password);


// const config = {
//   apiKey: "AIzaSyCiSjG4SCjPyLS4cimpJZih-Jasb0OnSxI",
//   authDomain: "music-event-app.firebaseapp.com",
//   databaseURL: "https://music-event-app.firebaseio.com",
//   projectId: "music-event-app",
//   storageBucket: "music-event-app.appspot.com",
//   messagingSenderId: "100344553688",
// };

// if (!firebase.apps.length) {
//    firebase.initializeApp(config);
// }

// const auth = firebase.auth();
//
// export {
//   auth,
// };
