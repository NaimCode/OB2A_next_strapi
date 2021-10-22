// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { onAuthStateChanged } from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: "o-b2a-c5c02",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDEDID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-R0NL3BW1D6",
};

// Initialize Firebase

let app;

try {
  app = initializeApp(firebaseConfig);
} catch (e) {
  console.log(e);
  app = getApp();
}

export const auth = getAuth(app);

///
export const getUser = (setuser) => {
  onAuthStateChanged(auth, (user) => {
    user ? setuser(user) : setuser({});
  });
};
