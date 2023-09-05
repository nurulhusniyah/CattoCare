import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

 const firebaseConfig = {
  apiKey: "AIzaSyBbYEVkWIFus43GoCpJPS_cK7Uo8tJxTG4",
  authDomain: "formlogin-4cea0.firebaseapp.com",
  projectId: "formlogin-4cea0",
  storageBucket: "formlogin-4cea0.appspot.com",
  messagingSenderId: "369909745599",
  appId: "1:369909745599:web:369cb7a557e1e802bc030a"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);


  document.getElementById("reg-btn").addEventListener('click', function(){
   document.getElementById("register-div").style.display="inline";
   document.getElementById("login-div").style.display="none";
});

document.getElementById("log-btn").addEventListener('click', function(){
 document.getElementById("register-div").style.display="none";
 document.getElementById("login-div").style.display="inline";

});



  document.getElementById("login-btn").addEventListener('click', function(){
   const loginEmail= document.getElementById("login-email").value;
   const loginPassword =document.getElementById("login-password").value;

   signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    window.location.href = "home";
    /*
    document.getElementById("result-box").style.display="inline";
     document.getElementById("login-div").style.display="none";
     document.getElementById("result").innerHTML="Welcome Back<br>"+loginEmail+" was Login Successfully";*/
  })
  .catch(function(error)  {
  var errorCode = error.code;
         var errorMessage = error.message;
         if (errorCode === 'auth/wrong-password') {
            alert('Wrong password. Please try again.');
          }else{
          console.log(errorMessage);
          }


  /*
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("login-div").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;*/

  });
});


  document.getElementById("register-btn").addEventListener('click', function(){

   const registerEmail= document.getElementById("register-email").value;
   const registerPassword =document.getElementById("register-password").value;

   createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  .then((userCredential) => {
    const user = userCredential.user;
        window.location.href = "form";
     alert('Successfully Registered! You can Login Now.');
      /*document.getElementById("login-div").style.display="inline";
     document.getElementById("register-div").style.display="none";

    document.getElementById("result-box").style.display="inline";
     document.getElementById("register-div").style.display="none";
     document.getElementById("result").innerHTML="Welcome <br>"+registerEmail+" was Registered Successfully";*/


  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("register-div").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;

  });
});


document.getElementById("log-out-btn").addEventListener('click', function(){
  signOut(auth).then(() => {
     document.getElementById("result-box").style.display="none";
       document.getElementById("login-div").style.display="inline";
  }).catch((error) => {
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
  });

});


const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements.name.value;
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  firebase.database().ref('messages').push({
    name: name,
    email: email,
    message: message
  });
});
