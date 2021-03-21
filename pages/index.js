import Head from "next/head";
import { useEffect, useState } from "react";
import { db } from "./../firebase";
import { ARTICLES } from "./../utils/constants";
import AllArticles from "../components/AllArticles/AllArticles";
import DynamicHeader from "../components/DynamicHeader/DynamicHeader";
import FloatingSearchBar from "../components/FloatingSearchBar/FloatingSearchBar";
import debounce from "lodash.debounce";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [articlesList, setArticlesList] = useState([]);
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [notFoundDataErr, setNoFoundDataErr] = useState(false);
  
  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("userInfo")));
  }, []);
  
  useEffect(() => {
    getArticlesFirestore();
  }, []);
  
  useEffect(() => {
    delayedHandleChange();
  }, [searchValue]);
  
  const delayedHandleChange = debounce(() => getFilteredAtricles(), 2000);
  
  const getArticlesFirestore = async () => {
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

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const getFilteredAtricles = () => {
    if (searchValue) {
      let filteredArticlesList = articlesList.filter(
        (obj) =>
          obj.authorName.includes(searchValue) ||
          obj.categoryName.includes(searchValue)
      );
      setArticlesList(filteredArticlesList);
      if (filteredArticlesList.length === 0) {
        setNoFoundDataErr(true);
      }
    } else {
      getArticlesFirestore();
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    getFilteredAtricles();
  };

  return (
    <section className={`container-fluid section-min-height`}>
      <Head>
        <title>All Articles</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <DynamicHeader />
        <div
          className={`d-flex justify-content-between align-items-baseline ${styles.heading}`}
        >
          <h1 className={`mt-5 font-weight-bold mx-md-4 mx-0 ${styles.title}`}>
            All Articles
          </h1>
          <FloatingSearchBar
            handleSearchChange={handleSearchChange}
            handleSubmitSearch={handleSubmitSearch}
            searchValue={searchValue}
            className="mx-md-3 mx-0"
            placeholder="Search with author name or category name"
          />
        </div>
        {articlesList && articlesList.length > 0 && (
          <AllArticles articlesList={articlesList} user={user} />
        )}
        {notFoundDataErr && (
          <p className="text-center text-muted my-5">
            No matched results found
          </p>
        )}
      </main>
    </section>
  );
};
export default Home;
