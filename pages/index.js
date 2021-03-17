import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "./../firebase";
import { ARTICLES, FAVORITES } from "./../utils/constants";
import AllArticles from "../components/AllArticles/AllArticles";
import styles from "../styles/Home.module.css";

const Home = () => {
  const router = useRouter();
  const [articlesList, setArticlesList] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("userInfo")));
  }, []);

  useEffect(() => {
    getAllArticles();
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

  const addToFavourites = async (articleObj, favouritBY) => {
    if (user) {
      // add to favorites
      if (!favouritBY.includes(user.uid)) {
        await db
          .collection(ARTICLES)
          .doc(articleObj.id)
          .update({
            favouritBY: [...favouritBY, user.uid],
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
            favouritBY: user.uid,
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
            favouritBY: favouritBY.filter((item) => item !== user.uid),
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

  return (
    <section className={`container-fluid section-min-height`}>
      <Head>
        <title>All Articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={` font-weight-bold mx-md-4 mx-0 ${styles.title}`}>All Articles</h1>
        {articlesList && articlesList.length > 0 && (
          <AllArticles
            articlesList={articlesList}
            addToFavourites={addToFavourites}
            user={user}
          />
        )}
      </main>
    </section>
  );
};
export default Home;
