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

  return (
    <section className={`container-fluid section-min-height`}>
      <Head>
        <title>All Articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={` font-weight-bold mx-md-4 mx-0 ${styles.title}`}>
          All Articles
        </h1>
        {articlesList && articlesList.length > 0 && (
          <AllArticles
            articlesList={articlesList}
            user={user}
          />
        )}
      </main>
    </section>
  );
};
export default Home;
