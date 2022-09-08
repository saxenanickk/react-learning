import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAzYotRB5zmGEaL1DSE8j6m9d3fJqdHvow",
  authDomain: "linkedin-clone-f36d2.firebaseapp.com",
  projectId: "linkedin-clone-f36d2",
  storageBucket: "linkedin-clone-f36d2.appspot.com",
  messagingSenderId: "633766763885",
  appId: "1:633766763885:web:bcbd430d525a8c2ab64e64",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebaseApp.auth();

export { db, auth };
