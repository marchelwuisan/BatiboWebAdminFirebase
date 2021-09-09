import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBI29LQEw8r7j0EePQsi-aQu1m022z9eoY",
  authDomain: "batibo-6caf0.firebaseapp.com",
  databaseURL: "https://batibo-6caf0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "batibo-6caf0",
  storageBucket: "batibo-6caf0.appspot.com",
  messagingSenderId: "470633811035",
  appId: "1:470633811035:web:12b6a41b2020cfceda037e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
