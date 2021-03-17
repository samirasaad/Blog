import { auth } from "./";
// import History from "./../routes/History";

function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

function signInFirestore(provider) {
  console.log(provider);
  const providerMethod =
    provider === "google"
      ? new auth.GoogleAuthProvider()
      : provider === "github" && new auth.GithubAuthProvider();
  return auth().signInWithPopup(providerMethod);
}

const firebaseSignout = () => {
  auth()
    .signOut()
    .then((res) => {
      localStorage.clear();
      // History.push("/Login");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export { signup, signin, signInFirestore, firebaseSignout };
