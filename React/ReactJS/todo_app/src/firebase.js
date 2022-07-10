import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDjK-R7vq2psE1u8eePtNliPZkVw-yL9FA",
    authDomain: "todo-app-776eb.firebaseapp.com",
    projectId: "todo-app-776eb",
    storageBucket: "todo-app-776eb.appspot.com",
    messagingSenderId: "640846864017",
    appId: "1:640846864017:web:62702591b333e325d42930",
    measurementId: "G-0T8RE0MH94"
});

const db = firebaseApp.firestore();

export { db };