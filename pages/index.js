import Head from "next/head";
import { useEffect, useState } from "react";
import { db } from "./../firebase";
import { ARTICLES, FAVORITES } from "./../utils/constants";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [userID, setUserID] = useState(null);
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    getAllArticles();
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      let id =
        localStorage.getItem("userInfo") &&
        JSON.parse(localStorage.getItem("userInfo")).uid;
      setUserID(id);
    }
  }, []);

  const getAllArticles = async () => {
    db.collection(ARTICLES).onSnapshot(
      (querySnapshot) => {
        let articles = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setArticlesList(articles);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const addToFavourites = async (articleObj, articleID, favouritBY) => {
    // add to favorites
    if (!favouritBY.includes(userID)) {
      await db
        .collection(ARTICLES)
        .doc(articleObj.id)
        .update({
          favouritBY: [...favouritBY, userID],
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
        .doc(articleObj.id + "-" + userID)
        .set({
          ...articleObj,
          favouritBY: userID,
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
          favouritBY: favouritBY.filter((item) => item !== userID),
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
        .doc(articleObj.id + "-" + userID)
        .delete()
        .then(() => {
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section className={`container-fluid section-min-height`}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>HomePage</h1>
        {articlesList.length > 0 &&
          articlesList.map((article) => (
            <div className="" key={article.id}>
              {article.content}
              {userID !== article.authorID && (
                <span
                  onClick={() =>
                    addToFavourites(article, article.id, article.favouritBY)
                  }
                >
                  {article.favouritBY.includes(userID) ? (
                    <span>remmove from favourites</span>
                  ) : (
                    <span>add to favourites</span>
                  )}
                </span>
              )}
            </div>
          ))}
      </main>
    </section>
  );
};
export default Home;
