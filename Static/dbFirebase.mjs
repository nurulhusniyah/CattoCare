



//import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
//import { getStorage } from "firebase/storage";
//import { getFirestore } from "firebase/firestore";


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDO4X-mtg8kgQ0w3KTDGXzNJ0GynVICBqI",
    authDomain: "databasefire-33178.firebaseapp.com",
    databaseURL: "https://databasefire-33178-default-rtdb.firebaseio.com",
    projectId: "databasefire-33178",
    storageBucket: "databasefire-33178.appspot.com",
    messagingSenderId: "685329591254",
    appId: "1:685329591254:web:c55b9cc83d39c857771277"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);






document.getElementById('sign_Up').addEventListener('click',(e) => {

  var username = document.getElementById('name').value;
  var password = document.getElementById('password').value;
  var email = document.getElementById('email').value;


  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('User Created!')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert('errorMessage');
    });


}):


 document.getElementById('sign_in').addEventListener('click', function(){
    const loginEmail=document.getElementById('email').value;
        const loginPassword=document.getElementById('password').value;


    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('User Succesfull Log in!');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });