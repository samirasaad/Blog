import React, { useEffect, useState } from "react";
import HeadTabs from "../../components/HeadTabs/HeadTabs";
import { db } from "./../../firebase";
import { ARTICLES, FAVORITES } from "./../../utils/constants";
import Cookies from "js-cookie";
import HeadSection from "../../components/HeadSection/HeadSection";
import Snackbar from "../../components/Snackbar/Snackbar";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [myArticlesList, setMyArticlesList] = useState([]);
  const [myFavoritesList, setMyFavoritesList] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setUser(Cookies.get("userInfo") && JSON.parse(Cookies.get("userInfo")));
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setTimeout(() => {
        setIsSnackbarOpen(false);
      }, 4000);
    }
    return () => mounted = false;
  }, [isSnackbarOpen]);

  useEffect(() => {
    let mounted = true;
    if (user && user.uid && mounted) {
      setLoading(true);
      getMyArticles();
      getMyFavourites();
    }

    return () => mounted = false;
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
            setIsSnackbarOpen(true);
            setMsg("Article deleted successfully");
            setType("sucess");
          })
          .catch(function (err) {
            console.log("Error getting documents: ", err);
          });
      })
      .catch((err) => {
        setIsSnackbarOpen(true);
        setLoading(false);
        console.log(err);
        setMsg(err.code);
        setType("error");
      });
  };

  return (
    <section className="container section-min-height mt-4">
      <HeadSection
        title="Blog | Profile"
        metadata={[
          {
            name: "description",
            content: "Next.js blog app react, next js and firebase",
          },
          {
            name: "keywords",
            content:
              "HTML, CSS, CSS3, JavaScript, react, redux, react-redux, firebase, firestore",
          },
          { name: "author", content: "Samira Saad" },
        ]}
        links={[{ rel: "icon", href: "/favicon.ico" }]}
      />
      <Snackbar isOpen={isSnackbarOpen} msg={msg} type={type} />
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

export default Profile;
