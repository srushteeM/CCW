import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCH8klVyhKhZNNaT1gjIYC6BajQ6Zzqm9g",
    authDomain: "creware-coworks.firebaseapp.com",
    projectId: "creware-coworks",
    storageBucket: "creware-coworks.appspot.com",
    messagingSenderId: "752826699237",
    appId: "1:752826699237:web:bd7afa55da57a9cce2730c"
  };

const firebaseApp =firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage=firebase.storage()
const firestore = firebase.firestore();
export  {db,auth,storage,firestore};