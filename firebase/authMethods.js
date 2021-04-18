import { auth } from "./";
import Cookies from "js-cookie";
import Router from "next/router";

function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

function signInFirestore(provider) {
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
      Cookies.remove("userInfo");
      Router.push("/Login");
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export { signin, signInFirestore, firebaseSignout };
