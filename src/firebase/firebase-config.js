import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC46jiGK1W-qYxLQpwS5_-rxyW4jUAB8k0",
    authDomain: "react-app-cursos-ca95d.firebaseapp.com",
    projectId: "react-app-cursos-ca95d",
    storageBucket: "react-app-cursos-ca95d.appspot.com",
    messagingSenderId: "114176879588",
    appId: "1:114176879588:web:38af147b9363850a35f5f1",
    measurementId: "G-42S32PCQR3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.analytics();

 const db= firebase.firestore();
 const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

 export{
     db,
     googleAuthProvider,
     firebase
 }