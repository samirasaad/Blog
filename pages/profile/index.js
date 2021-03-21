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
    // remove from articles list
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
    // remove from favorites list
    await db
      .collection(FAVORITES)
      .where("id", "==", articleID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log("Document successfully deleted!");
            })
            .catch(function (error) {
              console.error("Error removing document: ", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <section className="container section-min-height mt-5">
      <HeadTabs
        user={user}
        myArticlesList={myArticlesList}
        myFavoritesList={myFavoritesList}
        deleteArticle={deleteArticle}
      />
    </section>
  );
};

// export default withAuth(Profile);
export default withPrivateRoute(Profile);

Profile.getInitialProps = async (props) => {
  console.info("##### profile", props);
  return {};
};
