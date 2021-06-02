import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import Cookies from "js-cookie";
import { ARTICLES, BASE_HREF } from "../../utils/constants";
import Article from "../../components/Article/Article";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";
import HeadSection from "../../components/HeadSection/HeadSection";
import LoaderComp from "../../components/Loader/Loader";
import Head from "next/head";

const articleDetails = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [articleID, setArticleID] = useState(null);
  const [articleInfo, setArticleInfo] = useState(null);
  const id = router.query.id;

  useEffect(() => {
    Cookies.get("userInfo") &&
      setUser(JSON.parse(Cookies.get("userInfo")) || null);
  }, []);

  useEffect(() => {
    id && setArticleID(id);
  }, [id]);

  useEffect(() => {
    let mounted = true;
    if (mounted && articleID) {
      articleID && getArticleDetails();
    }
    return () => (mounted = false);
  }, [articleID]);

  const getArticleDetails = () => {
    setLoading(true);
    db.collection(ARTICLES)
      .where("id", "==", articleID)
      .onSnapshot(
        (querySnapshot) => {
          let articleDetails = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          setArticleInfo(articleDetails[0]);
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          console.log(error);
        }
      );
  };

  return (
    <section className="section-min-height">
      {/* {articleInfo && ( */}
      <Head>
        <title>title</title>

        <meta property="og:title" content="title" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="article" />
        <meta property="og:description" content="title" />
        <meta property="og:image" content="" />

        {/* twitter meta tags  */}
        {/* <meta property="twitter:title" content="" />
        <meta property="twitter:description" content="" />
        <meta property="twitter:image" content="" />
        <meta property="twitter:card" content="" /> */}
      </Head>
      {/* )} */}
      {articleInfo && !loading ? (
        <>
          <AuthorInfo
            authorInfo={{
              authorName: articleInfo && articleInfo.authorName,
              authorPhoto: articleInfo && articleInfo.authorPhoto,
            }}
          />
          <Article
            articleInfo={articleInfo}
            articleFullURL={`${BASE_HREF}${router.asPath}`}
            isDetails={true}
            user={user}
          />
        </>
      ) : (
        <div className="d-flex justify-content-center my-5">
          <LoaderComp />
        </div>
      )}
    </section>
  );
};

export default articleDetails;

// articleDetails.getInitialProps = async (ctx) => {
//   const id = ctx.query.id;
//   return {
//     id,
//   };
// };
