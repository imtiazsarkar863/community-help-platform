console.log("script.js is running ✅");

const firebaseConfig = {
  apiKey:  "AIzaSyD2iueu5eBA8tx_TLkVawxzVQ9k2SxRFdg",
  authDomain: "community-help-platform-d2dba.firebaseapp.com",
  projectId: "community-help-platform-d2dba"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function addRequest() {
  const title = document.getElementById("title").value;
  if (!title) return;

  db.collection("requests").add({
    text: title,
    time: firebase.firestore.FieldValue.serverTimestamp()
  });

  document.getElementById("title").value = "";
}

db.collection("requests").orderBy("time", "desc")
  .onSnapshot(snapshot => {
    const list = document.getElementById("requests");
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().text;
      list.appendChild(li);
    });
  });
