import { db } from "./../firebase";
import { ARTICLES, FAVORITES } from "./../utils/constants";

export const isAuth = () => {
  return localStorage.getItem("userInfo") ? true : false;
};
export const logout = () => {
  localStorage.clear();
};

export const addToFavourites = async (user, articleObj, favouritBY) => {
  if (user) {
    // add to favorites
    if (!favouritBY.find((obj) => obj.id === user.uid)) {
      await db
        .collection(ARTICLES)
        .doc(articleObj.id)
        .update({
          favouritBY: [...favouritBY, { id: user.uid }],
        })
        .then(() => {
          // setLoading(false);
        })
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
        .then(() => {
          // setLoading(false);
        })
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
        .then(() => {
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      // remove doc favourites collection [my favourites]
      await db
        .collection(FAVORITES)
        .doc(articleObj.id + "-" + user.uid)
        .delete()
        .then(() => {
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    router.push("/Login");
  }
};
