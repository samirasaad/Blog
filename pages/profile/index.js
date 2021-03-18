import React, { useEffect, useState } from "react";
import HeadTabs from "../../components/HeadTabs/HeadTabs";
import withPrivateRoute from "../../routeGuard/PrivateRoute";
import { db } from "./../../firebase";
import { ARTICLES, FAVORITES } from "./../../utils/constants";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myArticlesList, setMyArticlesList] = useState([]);
  const [myFavoritesList, setMyFavoritesList] = useState([]);

  useEffect(() => {
    if (typeof window !== undefined) {
      let id =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).uid;
      setUser(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  useEffect(() => {
    if (user && user.uid) {
      getMyArticles();
      getMyFavourites();
    }
  }, [user]);

  const getMyArticles = () => {
    db.collection(ARTICLES)
      .where("authorID", "==", user.uid)
      .onSnapshot(
        (querySnapshot) => {
          let articles = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          setMyArticlesList(articles);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getMyFavourites = () => {
    db.collection(FAVORITES)
      .where("favouritBY", "array-contains", { id: user.uid })
      .onSnapshot(
        (querySnapshot) => {
          let favorites = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
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
    <section className="container section-min-height">
      <HeadTabs
        user={user}
        myArticlesList={myArticlesList}
        myFavoritesList={myFavoritesList}
        deleteArticle={deleteArticle}
        // addToFavourites={addToFavourites}
      />
      {/* <p onClick={getMyArticles}>my articles</p>
      <p onClick={getMyFavourites}>my favorites</p>
      {myArticlesList.length > 0 ? (
        myArticlesList.map((article) => (
          <div>
            {article.content}
            <span onClick={() => deleteArticle(article.id)}>delete</span>
          </div>
        ))
      ) : (
        <span>u have no articles yet add?</span>
      )} */}
    </section>
  );
};

// export default withAuth(Profile);
export default withPrivateRoute(Profile);

Profile.getInitialProps = async (props) => {
  console.info("##### profile", props);
  return {};
};
