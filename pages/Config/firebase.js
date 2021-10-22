// Import the functions you need from the SDKs you need
import { getApp, initializeApp, getApps } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARhBGL4_5JX3mvW1SlEiP4LThSrJCDcGk",
  authDomain: "o-b2a-c5c02.firebaseapp.com",
  databaseURL:
    "https://o-b2a-c5c02-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "o-b2a-c5c02",
  storageBucket: "o-b2a-c5c02.appspot.com",
  messagingSenderId: "1042016696741",
  appId: "1:1042016696741:web:ae965033d2819f3ebc504c",
  measurementId: "G-R0NL3BW1D6",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig, "ob2a");

export const auth = getApp("ob2a");
