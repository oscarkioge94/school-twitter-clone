document.getElementById("button").onclick = function(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var userName = document.getElementById("userName").value;
  var phone = document.getElementById("phoneNumber").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) =>{
      var user = userCredential.user;

      firebase.firestore().collection("users").doc().set({
        userId: user.uid,
        Email: email,
        Password: password,
        UserName: userName,
        PhoneNumber: phone
      }).then(() => { 
         window.location.href = "index.html";
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) =>{
      console.log("error is: ", error);
    });
}

