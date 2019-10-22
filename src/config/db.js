import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyAzL3TJHLTT-PqQhHOSKMjiPEd9Dc8VPyE",
    authDomain: "dummy-db-f351b.firebaseapp.com",
    databaseURL: "https://dummy-db-f351b.firebaseio.com",
    projectId: "dummy-db-f351b",
    storageBucket: "dummy-db-f351b.appspot.com",
    messagingSenderId: "401831133629",
    appId: "1:401831133629:web:1857771761b7dd113f52d4",
    measurementId: "G-QYBFJP0SXV"
};

const app = Firebase.initializeApp(config);
const db = app.database();
const storage = app.storage();

export {db,storage};