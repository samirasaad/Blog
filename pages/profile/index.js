import React, { useEffect, useState } from "react";
import withAuth from "../../routeGuard/privateRoute";
import { db } from "./../../firebase";
import { ARTICLES, FAVORITES } from "./../../utils/constants";

const Profile = () => {
  const [userID, setUserID] = useState(null);
  const [myArticlesList, setMayArticlesList] = useState([]);
  const [myFavoritesList, setMyFavoritesList] = useState([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      let id =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).uid;
      setUserID(id);
    }
  }, []);

  const getMyArticles = () => {
    db.collection(ARTICLES)
      .where("authorID", "==", userID)
      .onSnapshot(
        (querySnapshot) => {
          let articles = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          console.log(articles);
          setMayArticlesList(articles);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getMyFavourites = () => {
    db.collection(FAVORITES)
      .where("favouritBY", "==", userID)
      .onSnapshot(
        (querySnapshot) => {
          let favorites = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          console.log(favorites);
          setMyFavoritesList(favorites);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const deleteArticle = async (articleID) => {
    await db
      .collection(ARTICLES)
      .doc(articleID)
      .delete()
      .then(() => {
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className='container section-min-height'>
      <p onClick={getMyArticles}>my articles</p>
      <p onClick={getMyFavourites}>my favorites</p>
      {myArticlesList.length > 0 ? (
        myArticlesList.map((article) => (
          <div>
            {article.content}{" "}
            <span onClick={() => deleteArticle(article.id)}>delete</span>
          </div>
        ))
      ) : (
        <span>u have no articles yet add?</span>
      )}
    </section>
  );
};

export default withAuth(Profile);
