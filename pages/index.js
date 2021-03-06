import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import Cookies from "js-cookie";
import { db } from "./../firebase";
import { ARTICLES } from "./../utils/constants";
import AllArticles from "../components/AllArticles/AllArticles";
import DynamicHeader from "../components/DynamicHeader/DynamicHeader";
import FloatingSearchBar from "../components/FloatingSearchBar/FloatingSearchBar";
import HeadSection from "../components/HeadSection/HeadSection";
import LoaderComp from "../components/Loader/Loader";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [articlesList, setArticlesList] = useState([]);
  const [filteredArticlesList, setFilteredArticlesList] = useState([]);
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [notFoundDataErr, setNoFoundDataErr] = useState(false);

  useEffect(() => {
    let mounted = true;
    setUser(Cookies.get("userInfo") ? JSON.parse(Cookies.get("userInfo")) : {});
    if (mounted) {
      getArticlesFirestore();
    }
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (searchValue) {
        // delayedHandleChange();
      } else {
        setFilteredArticlesList(articlesList);
        setNoFoundDataErr(false);
      }
    }
    return () => (mounted = false);
  }, [searchValue]);

  const getArticlesFirestore = async () => {
    setLoading(true);
    db.collection(ARTICLES).onSnapshot(
      (querySnapshot) => {
        let articles = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setArticlesList(articles);
        setLoading(false);
        setFilteredArticlesList(articles);
      },
      (error) => {
        setLoading(false);
        console.log(error);
      }
    );
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const getFilteredAtricles = () => {
    let filteredList = articlesList.filter(
      (obj) =>
        obj.authorName.toLowerCase().includes(searchValue) ||
        obj.categoryName.toLowerCase().includes(searchValue) ||
        obj.title.toLowerCase().includes(searchValue)
    );
    setFilteredArticlesList(filteredList);
    if (filteredList.length === 0) {
      setNoFoundDataErr(true);
    } else {
      setNoFoundDataErr(false);
    }

    // highlighting search result
    // let backgroundColor = "yellow";
    // if (window.find && window.getSelection) {
    //   Array.from(document.getElementsByClassName("h6")).forEach((elem) => {
    //     elem.designMode = "on";
    //   });

    //   Array.from(
    //     document.getElementsByClassName("Card_category__1bULD")
    //   ).forEach((elem) => {
    //     elem.designMode = "on";
    //   });

    //   var sel = window.getSelection();
    //   sel.collapse(document.body, 0);

    //   while (window.find(searchValue)) {
    //     Array.from(document.getElementsByClassName("h6")).forEach((elem) => {
    //       elem.execCommand("HiliteColor", true, backgroundColor);
    //       // sel.collapseToEnd();
    //       Array.from(
    //         document.getElementsByClassName("Card_category__1bULD")
    //       ).forEach((elem) => {
    //         elem.execCommand("HiliteColor", false, backgroundColor);
    //         sel.collapseToEnd();
    //       });
    //     });

    //     document.designMode = "off";
    //   }
    // }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    getFilteredAtricles();
  };

  return (
    <section className={`container-fluid section-min-height`}>
      <HeadSection
        title="Blog | All Articles"
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
            className="mx-md-3 mx-0 search"
            placeholder="Search with author /category or article title"
          />
        </div>
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <LoaderComp />
          </div>
        ) : (
          filteredArticlesList &&
          filteredArticlesList.length > 0 && (
            <AllArticles articlesList={filteredArticlesList} user={user} />
          )
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
