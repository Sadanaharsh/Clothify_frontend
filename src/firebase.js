import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAkUA2agmR9EFOaGpXyIgXsDbBS7rwWztM",
    authDomain: "clothify-ec18c.firebaseapp.com",
    projectId: "clothify-ec18c",
    storageBucket: "clothify-ec18c.appspot.com",
    messagingSenderId: "1000393849631",
    appId: "1:1000393849631:web:8f286098dcb645ef164e2a",
    measurementId: "G-PW4839GDJX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider };



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCX9eWikTyDDjBJ-vP9839CiKsvRgFHX2Q",
//   authDomain: "ecommercev2-3265d.firebaseapp.com",
//   projectId: "ecommercev2-3265d",
//   storageBucket: "ecommercev2-3265d.appspot.com",
//   messagingSenderId: "296195690600",
//   appId: "1:296195690600:web:025c849ecabbad1ef76bdd",
//   measurementId: "G-X5SN2DKVF8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);




// const firebaseConfig = {
//     apiKey: "AIzaSyAkUA2agmR9EFOaGpXyIgXsDbBS7rwWztM",
//     authDomain: "clothify-ec18c.firebaseapp.com",
//     projectId: "clothify-ec18c",
//     storageBucket: "clothify-ec18c.appspot.com",
//     messagingSenderId: "1000393849631",
//     appId: "1:1000393849631:web:eade5aa091980cb2164e2a",
//     measurementId: "G-6W0HXYRF90"
//   };