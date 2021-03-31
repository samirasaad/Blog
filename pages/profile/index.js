import React, { useEffect, useState } from "react";
import HeadTabs from "../../components/HeadTabs/HeadTabs";
import withPrivateRoute from "../../routeGuard/PrivateRoute";
import withTestPrivateRoute from "../../routeGuard/TestPrivateRoute";
import { db } from "./../../firebase";
import { ARTICLES, FAVORITES } from "./../../utils/constants";
import Cookies from "js-cookie";
import HeadSection from "../../components/HeadSection/HeadSection";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [myArticlesList, setMyArticlesList] = useState([]);
  const [myFavoritesList, setMyFavoritesList] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(Cookies.get("userInfo")));
  }, []);

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     let id =
  //       localStorage.getItem("userInfo") &&
  //       JSON.parse(localStorage.getItem("userInfo")).uid;
  //     setUser(JSON.parse(localStorage.getItem("userInfo")));
  //   }
  // }, []);

  useEffect(() => {
    if (user && user.uid) {
      setLoading(true);
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
          setLoading(false);
        },
        (error) => {
          setLoading(false);
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
          setLoading(false);
        },
        (error) => {
          setLoading(false);
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
      .then(async () => {
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
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <section className="container section-min-height mt-4">
      <HeadSection
        title="Blog | Profile"
        metadata={[
          {
            name: "description",
            content: "Next.js blog app react , next js and firebase",
          },
          {
            name: "keywords",
            content:
              "HTML, CSS, CSS3, JavaScript, react, redux, react-redux, firebase, firestire",
          },
          { name: "author", content: "Samira saad" },
        ]}
        links={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <HeadTabs
        user={user}
        myArticlesList={myArticlesList}
        myFavoritesList={myFavoritesList}
        deleteArticle={deleteArticle}
        loading={loading}
      />
    </section>
  );
};

export default withTestPrivateRoute(Profile);
// export default (Profile);

// export const  getInitialProps = async (ctx) => {
//   console.info("##### profile", ctx);
//   return {

//   };
// };
