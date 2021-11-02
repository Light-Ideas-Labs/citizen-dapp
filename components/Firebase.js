import firebase from "firebase/app";
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyAkBCRUOsB5Vozg1kuIj2ofxeI5UAUa06k",
    authDomain: "citizen-e52d8.firebaseapp.com",
    projectId: "citizen-e52d8",
    storageBucket: "citizen-e52d8.appspot.com",
    messagingSenderId: "783204810776",
    appId: "1:783204810776:web:9bdbfb6f94e284b33a036d",
    measurementId: "G-EZ1NGQKLBN"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const firebaseStorageRef = firebase.storage();

export default firebaseStorageRef;
