import { db } from "./../firebase";
import { ARTICLES, FAVORITES } from "./../utils/constants";
import Cookies from "js-cookie";
import Router from "next/router";

export const isAuth = () => {
  return Cookies.get("userInfo");
};

export const logout = () => {
  localStorage.clear();
};

export const addToFavourites = async (e, user, articleObj, favouritBY) => {
  e.preventDefault();
  if (user && Object.keys(user).length > 0) {
    // add to favorites
    if (!favouritBY.find((obj) => obj.id === user.uid)) {
      await db
        .collection(ARTICLES)
        .doc(articleObj.id)
        .update({
          favouritBY: [...favouritBY, { id: user.uid }],
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
      // update favourites collection [my favourites]
      await db
        .collection(FAVORITES)
        .doc(articleObj.id + "-" + user.uid)
        .set({
          ...articleObj,
          favouritBY: [...favouritBY, { id: user.uid }],
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      // remove favorites
      // remove fav. by from article obj
      console.log("remove");
      await db
        .collection(ARTICLES)
        .doc(articleObj.id)
        .update({
          favouritBY: favouritBY.filter((item) => item.id !== user.uid),
        })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
      // remove doc favourites collection [my favourites]
      await db
        .collection(FAVORITES)
        .doc(articleObj.id + "-" + user.uid)
        .delete()
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    Router.push("/Login");
  }
};
