import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyAzL3TJHLTT-PqQhHOSKMjiPEd9Dc8VPyE",
    authDomain: "dummy-db-f351b.firebaseapp.com",
    databaseURL: "https://dummy-db-f351b.firebaseio.com",
    projectId: "dummy-db-f351b",
    storageBucket: "",
    messagingSenderId: "401831133629",
    appId: "1:401831133629:web:1857771761b7dd113f52d4",
    measurementId: "G-QYBFJP0SXV"
};

let app = Firebase.initializeApp(config);
export const db = app.database();