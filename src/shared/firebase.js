import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtL3S_ttMq0wLbtdkoRGb2Geb09OuPuQA",
  authDomain: "image-community-cc976.firebaseapp.com",
  databaseURL: "https://image-community-cc976-default-rtdb.firebaseio.com",
  projectId: "image-community-cc976",
  storageBucket: "image-community-cc976.appspot.com",
  messagingSenderId: "468578718682",
  appId: "1:468578718682:web:715a8a60333d1213d1e6e3",
  measurementId: "G-MT4B3PGE4T",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();

export { auth, apiKey };
