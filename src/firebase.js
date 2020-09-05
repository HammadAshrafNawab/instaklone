import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBblgvGvDIVxSmyGVtKKQN_W2GB9oN9o8U",
  authDomain: "insta-klone.firebaseapp.com",
  databaseURL: "https://insta-klone.firebaseio.com",
  projectId: "insta-klone",
  storageBucket: "insta-klone.appspot.com",
  messagingSenderId: "994550182842",
  appId: "1:994550182842:web:277a932ccf9627d05ae383",
  measurementId: "G-MK059G8TXE"
});

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage , firebase};
