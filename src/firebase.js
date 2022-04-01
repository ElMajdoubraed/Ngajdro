import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/messaging";
import "firebase/compat/firestore"

const firebaseConfig = {

    apiKey: "AIzaSyCRmxXdLydLhwuxmNJv8F63jszXMgJyMLQ",

    authDomain: "ngajdro.firebaseapp.com",

    databaseURL: "https://ngajdro-default-rtdb.firebaseio.com",

    projectId: "ngajdro",

    storageBucket: "ngajdro.appspot.com",

    messagingSenderId: "192568356006",

    appId: "1:192568356006:web:0b6df46b375ba449519867",

    measurementId: "G-TMVYT1KGJB"
  

};

  const fireBase = firebase.initializeApp(firebaseConfig);
  export const auth = fireBase.auth();
  export const database = fireBase.database()
  export const messaging = fireBase.messaging();
  export const db = fireBase.firestore();
  export const storage = fireBase.storage();
  export default fireBase.database().ref();