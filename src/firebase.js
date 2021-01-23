 import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAEO7scNox7YLmhtAwZJH-vuxdfIqbjzPQ",
    authDomain: "instagram-clone-fab87.firebaseapp.com",
    projectId: "instagram-clone-fab87",
    storageBucket: "instagram-clone-fab87.appspot.com",
    messagingSenderId: "478034601983",
    appId: "1:478034601983:web:a37b279f37005c6799e9ca",
    measurementId: "G-6SDG4Q8BE8"

  });

  const db = firebaseApp.firestore() ;
  const auth = firebaseApp.auth() ;
  const storage = firebaseApp.storage() ;

  export{db,auth,storage} ;

 