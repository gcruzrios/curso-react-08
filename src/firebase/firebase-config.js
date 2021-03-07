import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//console.log(process.env);

const firebaseConfig = {

/*
    apiKey: "AIzaSyC46jiGK1W-qYxLQpwS5_-rxyW4jUAB8k0",
    authDomain: "react-app-cursos-ca95d.firebaseapp.com",
    projectId: "react-app-cursos-ca95d",
    storageBucket: "react-app-cursos-ca95d.appspot.com",
    messagingSenderId: "114176879588",
    appId: "1:114176879588:web:38af147b9363850a35f5f1",
    measurementId: "G-42S32PCQR3"
*/ 
/*
  var firebaseConfigTesting = {
    apiKey: "AIzaSyDYA3aYuOZhaSDGVUMaCMM-nzahtx1ajBg",
    authDomain: "react-curso-desarrollo.firebaseapp.com",
    projectId: "react-curso-desarrollo",
    storageBucket: "react-curso-desarrollo.appspot.com",
    messagingSenderId: "23395888202",
    appId: "1:23395888202:web:ba6ab8889beed199788ab3",
    measurementId: "G-EZWBGYSDBD"
  };

  if (process.env.NODE_ENV ==='test'){
    //testing
    firebase.initializeApp(firebaseConfigTesting);
  }else{
  
    //dev/production
*/

    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId:process.env.REACT_APP_measurementId 

};

  
    firebase.initializeApp(firebaseConfig);
 // }
  // Initialize Firebase
  
 // firebase.analytics();

 const db= firebase.firestore();
 const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

 export{
     db,
     googleAuthProvider,
     firebase
 }