document.getElementById('tweetBtn').onclick = () => {
    document.querySelector('.tweet').style.display = "block";
}
document.querySelector('.cancel').onclick = () => {
    document.querySelector('.tweet').style.display = "none";
}
document.getElementById("logout").onclick = (() => {
    firebase.auth().signOut().then(() => {
        window.location.href = "login.html";
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
})

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.

            //pushing data to db
            document.getElementById("finalBtn").onclick = function(){

                    var tweetPost = document.querySelector(".subject").value;
                    var tweetDate = firebase.firestore.Timestamp.fromDate(new Date());

                        // Add a new document in collection "cities"
                    firebase.firestore().collection("tweets").doc().set({
                        tweet: tweetPost,
                        userId: user.uid,
                        date: tweetDate
                    })
                    .then(() => {
                        console.log("Document successfully written!");
                        document.querySelector('.tweet').style.display = "none";
                        
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }


//             //pull all userId from the db first
            firebase.firestore().collection("users").get().then((snapshot) =>{

                snapshot.forEach((document) =>{

                    var userId = document.data().userId;
                    var userNames = document.data().username;

                        //pull data

                        firebase.firestore().collection("tweets").where("userId", "==", userId).get().then((querySnapshot) => {

                            var content = '';
                            querySnapshot.forEach((doc) => {
                                // doc.data() is never undefined for query doc snapshots
                                console.log(doc.id, " => ", doc.data());

                                var tweetDate = doc.data().date;
                                var theTweet = doc.data().tweet;
                                var tweetUserId = doc.data().userId;

                                var theTweetDate = tweetDate.toDate().toDateString();

                                
                                



                            });
                            $(".middle").append(content);

                           
                            
                        });


                        
        });

    });


     } else {
      // No user is signed in.
  }
 });