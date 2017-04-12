import * as firebase from 'firebase';

// Firebase config
const config = {
  apiKey: "AIzaSyCmkP2i7T_BuXYPIa3_kFkehOqo1yl5KVs",
  authDomain: "icecream-world.firebaseapp.com",
  databaseURL: "https://icecream-world.firebaseio.com",
  projectId: "icecream-world",
  storageBucket: "icecream-world.appspot.com",
  messagingSenderId: "789735052164"
};

const databaseRef = firebase
  .initializeApp(config)
  .database()

export default databaseRef;
