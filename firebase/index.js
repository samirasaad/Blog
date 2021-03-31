import firebase from "firebase";
import "firebase/app";
import "firebase/auth";
import "firebase/storage";
  
  if( firebase.apps.length === 0 ){
    firebase.initializeApp({
      // apiKey:process.env.NEXT_PUBLIC_API_KEY,
      // authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,  
      // databaseURL: process.env.NEXT_PUBLIC_BASEURL,
      // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      // storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
      // messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      // appId: process.env.NEXT_PUBLIC_APP_ID,
      // measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
      apiKey: "AIzaSyCDSdgud8EUlW3dBVUu19hsbEjSL5R5CE4",
      authDomain: "blog-steel-nu.vercel.app",
      projectId: "blog-be1c4",
      storageBucket: "blog-be1c4.appspot.com",
      messagingSenderId: "778241952043",
      appId: "1:778241952043:web:c09383cd31f9268f5e9d6e",
      measurementId: "G-RPDMJ1P8NE"
    });
 }

const db = firebase.firestore();
const auth = firebase.auth;
const storage = firebase.storage();
export { db, auth, storage };
